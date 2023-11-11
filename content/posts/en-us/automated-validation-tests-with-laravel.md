---
featured: true
date: '2020-07-01'
title: 'Automated validation tests with Laravel'
description: 'Following the topic covered in the last post, now it is time to implement another type of automated test in Laravel. Automated tests on data validation.'
keywords: 'Tests, Request, Controller, Validation'
ptBrSlug: 'testes-automatizados-para-validacoes-no-laravel'
---

Following the topic covered in the [last post](/blog/posts/automated-email-testing-with-laravel), now it is time to
implement another type of automated test in Laravel. Automated tests on data validation.

A few days ago, a developer who is follower of mine contacted me to ask some questions about automated tests on data
validation, I shared some examples with him, and we discussed some more details about the topic. So, I realized it would
be a good idea to post the examples here, so more people can have access to it.

In my work routine, API development is quite common. Therefore, writing tests for this, too, and one of the logics that
I usually test is exactly the validations of the data received via requests.

Without further ado, let's get to the point!

### The context

My system has a simple user registration. It could be any site where we create an account, filling out some basic fields
initially.

I receive the data through a `Request`, inserting it into the database and returning the created object (simplified for
the example). See below:

```php
// app/Http/Controllers/UsersController.php

use App\Http\Requests\UserStoreRequest;
use App\User;

class UsersController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        return User::query()
            ->create($request->validated());
    }
}
```

In the `FormRequest` class, I validate the information coming from the form:

```php
// app/Http/Requests/UserStoreRequest.php

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name'     => 'required|max:100',
            'email'    => 'required|email',
            'password' => 'required|confirmed',
        ];
    }
}
```

### The test

My goal is to test whether the data is validated by the `Request` class correctly. To do this, I wrote two tests where,
in the first one, the focus is on the required fields and in the second one, the specifics of each field.

See below:

```php
// tests/Feature/Http/Controllers/UsersControllerTest.php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Support\Str;
use Tests\TestCase;

class UsersControllerTest extends TestCase
{
    public function testStoreRequiredValidation()
    {
        $this
            ->sendStoreRequest()
            ->assertStatus(422)
            ->assertJsonStructure([
                'errors' => [
                    'name',
                    'email',
                    'password',
                ],
            ]);
    }

    public function testStoreSpecificValidation()
    {
        $this
            ->sendStoreRequest([
                'name'                  => Str::random(120),
                'email'                 => Str::random(50),
                'password'              => '123456',
                'password_confirmation' => '12345',
            ])
            ->assertStatus(422)
            ->assertJsonStructure([
                'errors' => [
                    'name',
                    'email',
                    'password',
                ],
            ]);
    }

    private function sendStoreRequest(array $data = [])
    {
        return $this->postJson(route('users.store'), $data);
    }
}
```

See the result:

![Result of the tests](/images/posts/laravel-test-form-requests/two-tests.png)

### Improving

In the scenario described, we can also validate whether the email provided is already registered in our database by just
adding the `unique` rule to my `Request`.

```php
// app/Http/Requests/UserStoreRequest.php

public function rules()
{
    return [
        'name'     => 'required|max:100',
        'email'    => 'required|email|unique:users',
        'password' => 'required|confirmed',
    ];
}
```

In the test, I create a user to ensure that there is already one registered in the database and send their email in the
request in order to force the error.

```php
// tests/Feature/Http/Controllers/UsersControllerTest.php

public function testStoreUniqueEmailValidation()
{
    $user = factory(User::class)->create();

    $this
        ->sendStoreRequest([
            'name'                  => Str::random(100),
            'email'                 => $user->email,
            'password'              => '123456',
            'password_confirmation' => '123456',
        ])
        ->assertStatus(422)
        ->assertJsonStructure([
            'errors' => [
                'email',
            ],
        ]);
}
```

The result:

![Result of the tests](/images/posts/laravel-test-form-requests/three-tests.png)

Many rules can be implemented in data validations. I recommend that, there more validation rules you have, the more
tests write, as I believe it is the best way to explore the possibilities.

### Then

For testing related to form behavior, error display, I recommend using Laravel Dusk. In fact, I already wrote
a [post here on the blog about it](/blog/posts/automated-browsing-tests-with-laravel-dusk).

I notice a great lack of free content related to automated testing, at least in PHP. Lately, many people have told me
that they can't find anything that practical, and they feel lost without knowing how to start.

Gradually, I will bring new examples here to help. Maybe we can even do a live, coding tests and answering questions.
What do you think?

See you later!
