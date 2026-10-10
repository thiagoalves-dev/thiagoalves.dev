---
title: 'Avoiding duplicated decisions, in Laravel and beyond'
description: 'The expensive duplication is not copy-pasted code. It is the same decision made in four places, by four people, none of whom copied anything.'
date: '2026-06-10'
author: 'Thiago Alves'
---

The duplication that hurts a growing codebase isn't copy-pasted functions. Those are easy to see and easy to delete.
The expensive kind is the same *decision* made in four different places — what counts as a visible record, what a
status means to the person looking at it, which fields an endpoint returns. Nobody copied anything. Four people
independently wrote code that agreed on the day it was written and stopped agreeing in March.

The examples below use a support desk API — tickets, accounts, agents, customers — because the shape is easier to
follow than whatever domain you happen to be in.

The code is PHP and Laravel because that’s what I work in. The ideas aren’t. A template method and a strategy are
the same shape in any language with classes, and you’ll have your own version of a resource and a validation rule.

## Breaking the repository layer into view classes

Every list endpoint needs the same invisible rules. A ticket belongs to an account. Drafts are only visible to whoever
wrote them. Tickets on a deleted board don't count. Tickets in an archived queue don't count either, unless you asked
for that queue specifically.

Miss one of those in one query and you don't have a bug, you have a data leak.

The usual answer is a scope, or a helper the developer remembers to call. "Remembers to" is the problem.

So the rules live in an abstract base, and the base runs them:

```php
abstract class TicketView implements View
{
    public function __construct(protected TicketViewOptions $options) {}

    public function __invoke(): Builder
    {
        $query = Ticket::query();

        $this->limitToAccount($query, $this->options->user->account_id);
        $this->hideOtherPeoplesDrafts($query, $this->options->user);
        $this->excludeDeletedBoards($query);
        $this->excludeArchivedQueues($query);

        return $this->build($query);
    }

    abstract protected function build(Builder $query): Builder;
}
```

A subclass never touches `__invoke()`. It writes `build()`, which is the only part that makes it different from the
others. It cannot skip the scoping, because it doesn't own the entry point. This is the template method pattern:
the base owns the algorithm and leaves exactly one step to whoever extends it.

Views and filters both carry a key:

```php
interface View
{
    public function __invoke(): Builder;
    public static function key(): string;
}

interface Filter
{
    public static function key(): string;
    public function apply(Builder $query): Builder;
}
```

which means a request can select them by string, and the repository assembles them:

```php
public function startView(string $key, TicketViewOptions $options): Builder
{
    return (match ($key) {
        InboxView::key()     => new InboxView($options),
        AssignedView::key()  => new AssignedView($options),
        ReportingView::key() => new ReportingView($options),
        default              => new DefaultView($options),
    })();
}
```

A dozen view classes for one model, and the security rules are written once.

This isn't "put your queries in a repository." A repository with twelve public methods has exactly the problem the
controllers had. The win is that the base class owns the part nobody is allowed to forget.

## Declarative resources with lazy resolvers

The second place the same decision gets made is on the way out. One endpoint returns a ticket. Another returns a ticket
with its customer. A third returns a ticket with its customer, its assignee and its attachments. Written as three
resources, they drift — and the one nobody touches for a year is the one still returning a field that was renamed.

So a resource declares its default shape and its optional relationships separately:

```php
abstract class ApiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $this->readRequest($request);

        return [
            ...$this->resolveFields(),
            ...$this->resolveOptional(),
        ];
    }

    abstract protected function baseFields(): array;

    protected function optional(): array
    {
        return [];
    }
}
```

A concrete resource lists each optional relationship with its key and its own condition:

```php
protected function optional(): array
{
    return [
        new OptionalRelation(
            'customer',
            fn() => new CustomerResource($this->ticket->customer),
            fn() => $this->ticket->customer !== null,
        ),
        new OptionalRelation(
            'assignee',
            fn() => new AgentResource($this->ticket->assignee),
            fn() => $this->ticket->assignee !== null,
        ),
    ];
}
```

The closure is lazy, so nothing resolves unless somebody asked for it. And they ask in the query string —
`?include_customer=1&include_assignee=1`. The resolver reads `include_` plus its own key and decides.

Nested resources inherit the parameters, so `?include_assignee[fields]=phone` reaches the agent resource underneath
without the ticket resource knowing anything about agents.

A second resolver handles extra columns. `baseFields()` returns what everyone gets; `?fields=reference,priority` adds
more, filtered against a blocklist so nobody can ask for `password` or `token`.

One resource per model. Every variation is a query parameter instead of a class.

## Enums with behaviour

The third place is the smallest and does the most damage. A ticket has a status. What does the status *mean*?

It depends who's asking. To the agent, `awaiting_customer` means there is nothing to do. To the customer, the same
status means they owe you a reply. Write that as a `match` in the API resource, then again in the notification, then
again in the email, then again in the frontend, and you have four definitions that were identical exactly once.

So the enum answers the question:

```php
enum TicketStatus: string
{
    case AWAITING_CUSTOMER = 'awaiting_customer';
    case AWAITING_AGENT    = 'awaiting_agent';
    case PENDING_REVIEW    = 'pending_review';

    public function callToAction(Ticket $ticket, User $user): string
    {
        if ($ticket->isOnHold()) {
            return self::NOTHING_TO_DO;
        }

        return $user->isAgentFor($ticket)
            ? $this->agentAction()
            : $this->customerAction();
    }

    private function agentAction(): string
    {
        return match ($this) {
            self::AWAITING_CUSTOMER => self::WAITING_ON_THEM,
            self::AWAITING_AGENT    => self::REPLY_NOW,
            self::PENDING_REVIEW    => self::REVIEW_AND_CLOSE,
        };
    }
}
```

The enum also groups its own cases:

```php
public static function awaitingCustomerCases(): array
{
    return [
        self::AWAITING_CUSTOMER,
        self::PENDING_SIGNATURE,
        self::PENDING_UPLOAD,
    ];
}
```

and that group is what the filter uses:

```php
$query->whereIn('tickets.status', TicketStatus::awaitingCustomerCases());
```

The same definition that renders a label builds a `whereIn`. Add a status and you add it to one list, rather than to a
filter and a resource and a notification and a mailer.

A PHP enum isn't a list of constants. It's a class that happens to have a fixed set of instances, and a lot of the
duplication I've removed in recent years came from remembering that.

## Four smaller ones

**Model traits.** Behaviour shared by several models, without a base class that accumulates everything forever. The
models that have children use this one; the rest never see it.

```php
trait WithOpenSubtickets
{
    public function blockingState(): Attribute
    {
        return new Attribute(get: fn() => $this->resolveBlockingState());
    }

    private function resolveBlockingState(): ?string
    {
        return $this->children()
            ->whereIn('status', TicketStatus::awaitingAgentCases())
            ->value('status');
    }
}
```

**Custom casts.** Four lines, and every write path is covered — the endpoint, the seeder, the import, the invitation
flow, and the one somebody adds next year without reading this.

```php
class NormalisedEmail implements CastsInboundAttributes
{
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return mb_strtolower($value);
    }
}
```

**Rule objects.** A validation rule that needs a query belongs in a class, not in a closure pasted into four form
requests. One `validate()` method, testable on its own — a specification, in the older vocabulary.

```php
class UniqueBoardName implements ValidationRule
{
    public function __construct(private readonly int $accountId) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $taken = Board::query()
            ->where('account_id', $this->accountId)
            ->where('name', $value)
            ->exists();

        if ($taken) {
            $fail('That board name is already in use.');
        }
    }
}
```

**Route model binding.** The cheapest one on the list and the one people skip longest. Type-hint the model and the
lookup disappears from every method that needed it.

```php
// Before: the same two lines in show, update, destroy and four others
public function show(int $id): TicketResource
{
    $ticket = Ticket::findOrFail($id);

    return new TicketResource($ticket);
}

// After
public function show(Ticket $ticket): TicketResource
{
    return new TicketResource($ticket);
}
```

## The shape underneath

Look at the three main ones again and they are the same move.

The view base runs the scoping, so a new view can't forget it. The resource declares its fields in one place, so a new
endpoint can't quietly invent its own. The enum answers what a status means, so a new consumer can't disagree with the
old ones.

None of them stop you writing duplicated code. They make the duplicated version harder to write than the correct one,
which is the only mechanism I've seen survive a team, a deadline and a developer who joined last week.

Duplication isn't repeated lines. It's repeated decisions. Find the decision that must never be made twice, and move
it somewhere it can't be skipped.
