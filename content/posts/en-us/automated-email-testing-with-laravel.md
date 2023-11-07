---
featured: true
date: '2020-06-26'
title: 'Automated Email Testing with Laravel'
description: 'A few days ago, I came across a question that I racked my brains trying to test. I needed to send an email to a customer and wanted to validate that it was assembled correctly.'
keywords: 'Tests, Mailable, Email, View, Markdown'
ptBrSlug: 'teste-automatizado-de-e-mail-no-laravel'
---

I confess that lately, I've been very interested in delving deeper into automated testing. In my daily life, the concern
about test coverage is increasing.

A few days ago, I came across a question that I racked my brains trying to test. I needed to send an email to a customer
and wanted to validate that it was assembled correctly.

In the Laravel documentation, I found an option called [Mail Fake](https://laravel.com/docs/mocking#mail-fake), but I
confess that it did not satisfy my needs. During my attempts, I made changes to the code that should have caused the
test to "break", but it did not. So, I gave up using it.

After talking to a friend, an interesting idea came up that would allow me to test the `Mailable` class and the `view`,
in a very simple way.

Below, I will use a fictional implementation to exemplify what I did.

### The context

I need to send an email to a customer containing a summary of the purchase order they placed on my website.

To do this, I implemented a `Mailable` class that receives the `ID` of the order that I will send in the message. In my
system, orders are represented by the `Order` class, which has a direct connection with the `User` class, representing
the customer who placed the order.

The email `view` was developed with [Markdown](https://en.wikipedia.org/wiki/Markdown), but the same could be done with
HTML.

Below is the slightly summarized code of the described context:

```php
// app/User.php

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
```

```php
// app/Order.php

class Order extends Model
{
    protected $fillable = [
        'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

```php
// app/Mail/OrderSummary.php

class OrderSummary extends Mailable
{
    private $orderId;

    public $order;

    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    public function build()
    {
        return $this
            ->loadOrder()
            ->to($this->order->user->email, $this->order->user->name)
            ->markdown('emails.order-summary');
    }

    private function loadOrder()
    {
        $this->order = Order::find($this->orderId);

        return $this;
    }
}
```

```blade
// resources/views/emails/order-summary.blade.php

@component('mail::message')

# Hello, {{ $order->user->name }}

Your order has been confirmed!

Total: ${{ $order->total_price }}.

@component('mail::button', ['url' => 'thiagoalves.dev/order/' . $order->id])
    See order
@endcomponent

@endcomponent
```

### The test

As mentioned in the introduction, my goal is to test the `Mailable` class and the `view` assembly, to make sure there
are no errors in this logic, due to changes that will happen in the code over time.

To do this, the first step is to generate fake data to use in the test. I did this using the famous `factories`.

```php
// database/factories/UserFactory.php

$factory->define(User::class, function (Faker $faker) {
    return [
        'name'     => $faker->name,
        'email'    => $faker->unique()->safeEmail,
        'password' => bcrypt('12345'),
    ];
});
```

```php
// database/factories/OrderFactory.php

$factory->define(Order::class, function (Faker $faker) {
    return [
        'total_price' => $faker->numberBetween(100, 200),
        'user_id'     => function () {
            return factory(User::class)->create()->getKey();
        },
    ];
});
```

To validate what I want, I will only use two tests. One that will test the `Mailable` build method and another that
validates the rendering of the email body. See below.

```php
// tests/Feature/Mail/OrderSummaryTest.php

class OrderSummaryTest extends TestCase
{
    private $mail;

    protected function setUp(): void
    {
        parent::setUp();

        $order = factory(Order::class)->create();

        $this->mail = new OrderSummary($order->getKey());
    }

    public function testBuildSuccess()
    {
        $this->assertInstanceOf(OrderSummary::class, $this->mail->build());
    }

    public function testRenderSuccess()
    {
        $this->assertIsString($this->mail->render());
    }
}
```

Simple, right? This alone is enough to verify that all the email assembly logic happens correctly. Both validate the
return of methods that should fail if something wrong happens.

See the result:

![Test succeed](/images/posts/laravel-mailable-tests/success.png)

Now if I remove the order relationship with the user, for example, both checks should break.

```php
// app/Order.php 

class Order extends Model
{
    protected $fillable = [
        'total_price',
    ];
}
```

Result:

![Test fails](/images/posts/laravel-mailable-tests/fail.png)

This test does not include validating the sending of the email, as this usually depends on an external server. The focus
is really testing your assembly, not integration with `SMTP`.

### Then

Sending emails tends to be one of the most obscure parts of a system and also one of the most annoying to test.

I've lost count of how many times I've made changes to a code, affecting the sending of an email that, often, had no
direct relationship with what was changed.

The code above is available in my [github repository](https://github.com/thiagoalves-dev/laravel-storage-example) for
you to copy. I hope it helps.

See you later!
