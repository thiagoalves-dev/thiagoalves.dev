---
title: 'What code comments are actually telling you'
description: 'A comment explaining what code does is usually an apology for not writing it clearly. The three comments actually worth keeping, and why the rest lie.'
date: '2026-05-27'
author: 'Thiago Alves'
---

Every developer has inherited code decorated with comments like "do not touch this" or "magic happens here."
They are funny right up until you have to fix a production incident at 2 AM, and the comment is the only thing
slowing you down.

Behind most comments is a good intention and a bad habit. In nearly twenty years of reading and reviewing code—and
more recently, setting up [automated review passes](/journal/how-i-use-ai-to-review-every-pull-request)—I have almost
never been saved by a comment that explained *what* a method was doing. Most of the time, the comment was an
apology for writing code that couldn't explain itself—or worse, a quiet lie.

## The comment that tells you what the code already says

The most common comment is the narration:

```php
// Check if the product is active
function check($object) {
    return $object->status === 'active';
}
```

The author knew the code was vague. `check()` doesn't say what it is checking, and `$object` could be an invoice,
a user, or an associative array. Instead of fixing the names, they added a sentence above it.

If you fix the method signature, the comment has nothing left to say:

```php
function isActive(Product $product): bool {
    return $product->status === 'active';
}
```

When code needs a translation layer in English to be understood, the fix is almost never a better comment. It is
narrower methods, typed parameters, and names that describe the domain instead of the data structure.

## Comments rot faster than code

Code has an advantage comments will never have: it has to run. If code breaks, the test suite catches it or production
complains.

A comment has no compiler, no linter, and no runtime verification. It just sits there.

```php
// Returns the current month as a two-digit string
public function getCurrentDate(): string {
    return Carbon::now()->format('Y-m-d');
}
```

This starts as a small refactor: someone changed `getCurrentMonth()` to return a full date, updated the format string,
ran the tests, opened the pull request, and merged it. Nobody updated the comment.

Six months later, an engineer fixing a billing bug reads the comment, trusts it, and spends two hours tracing why
an invoice grouped by month is creating a record per day. The code was working; the comment was sabotaging the reader.

## The only three comments worth writing

I don't ban comments on my teams, but I treat them as a last resort. If a comment is necessary, it almost always
falls into one of three buckets:

### 1. The bizarre constraint (the "why", never the "what")

Code can tell you *what* it is doing, but it cannot tell you why an external system forces you to do something unexpected:

```php
// Stripe webhook events can arrive out of order during account reconnects.
// Do not process subscription.updated before customer.created has settled.
```

No amount of clean architecture can explain a vendor's bug or an odd regulatory requirement. If the code looks
wrong on purpose, write down why.

### 2. The temporary tourniquet in production

Production is on fire, customers are impacted, and you need a dirty five-line fix to stop the bleeding:

```php
// HOTFIX: bypass cache lookup while Redis cluster rebuilds.
// Ticket: ENG-4122 — remove once failover completes.
```

Use the comment to mark the hack and tie it to a tracked ticket. Then delete both when the real fix lands.

### 3. Framework configuration files

Configuration files that ship with frameworks—like Laravel's `config/` directory—are settings dashboards, not
domain logic. Comments that explain valid options and their trade-offs make sense because nobody reads a config
file to understand an algorithm:

```php
/*
|--------------------------------------------------------------------------
| Application Timezone
|--------------------------------------------------------------------------
| Sensible default for internal timestamps. Stored in UTC, converted at display.
*/
'timezone' => 'UTC',
```

## If you feel the urge to comment, refactor first

When you finish a function and feel the urge to explain it with a comment, pause. That urge is your brain telling
you the code is dense, the naming is ambiguous, or the function is doing three things instead of one.

Extract the private method. Name the boolean variable. Give the parameter a real type.

If after doing all of that, someone reading the code would still ask "why would anyone do this?", write the comment.
Otherwise, let the code speak for itself.
