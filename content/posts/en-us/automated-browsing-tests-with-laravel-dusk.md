---
date: '2020-05-31'
title: 'Automated browsing tests with Laravel Dusk'
description: 'No matter how beginner you may be, it is very likely that, at some point, you have heard about automated testing, its importance in systems development and everything else.'
keywords: 'Automated, Tests, Navigation, Dusk'
ptBrSlug: 'testes-automatizados-de-navegacao-com-laravel-dusk'
---

No matter how beginner you may be, it is very likely that, at some point, you have heard about automated testing, its
importance in systems development and everything else.

In fact, as we increase the level of complexity of our projects, it is possible to notice how much this resource helps
us in building and maintaining functionalities.

Unfortunately, many professionals, including myself, only notice this when they start to face problems that could have
been avoided if the tests had been written. An example is the good old change that causes a break in another area of the
system.

### Different types of tests

This is a pretty broad field these days. There are ways to test virtually every area of an application. From that small
function that formats a CPF, for example, to a complex integration full of steps with another third-party system.

Unit, functional, integration, performance, security tests. The list is really extensive, to the point where some
companies have professionals specialized in developing these tests, known as QA (Quality Analyst).

### Laravel Dusk

It is a Laravel package for carrying out tests simulating browser behavior, filling out forms, clicking on buttons and
links, validating whether certain information appears on the screen and much more.

Like most solutions the framework offers, the package is very simple to install and use. The configuration process
practically does not exist, just execute the commands in the documentation. It also does not have dependencies
like [JDK](https://www.google.com/search?q=JDK) e [Selenium](https://www.selenium.dev).

#### Setup

Use `composer` in order to install the package in your project:

```shell
$ composer require --dev laravel/dusk
```

Subsequently, run the command that will create the entire test structure within a `Browser` folder, in the
project's `tests` directory.

```shell
$ php artisan dusk:install
```

![Diretório de testes do projeto](/images/posts/laravel-dusk/tests-directory.png)

You're all set!

P.S.: Confirm the installation commands in the [official documentation](https://laravel.com/docs/dusk), as they may
change.

P.S. 2: Before we start practicing, check if the APP_URL variable in your .env has the full URL of the application, if
not, correct it.

### Let's do it

#### The context

I implemented a very basic registration screen, where you only need to fill in your name and email. When clicking "
Save", I will be redirected to a second screen where I list all the registrations made. Screenchots below.

![Form to add items](/images/posts/laravel-dusk/form.png)

![List of items registered](/images/posts/laravel-dusk/list.png)

### Test 1

I need to create an automated test to ensure this behavior happens correctly. So I created the following test for this:

```
// tests/Browser/RegistersTest

public function testAddRegisterSuccess()
{
    // Gerador de dados falsos
    $faker = Factory::create('pt_BR');

    $this->browse(function (Browser $browser) use ($faker) {
        $name = $faker->name;
        $email = $faker->email;

        $browser->visit('/registers/create') // Access the route of the form
            ->type('name', $name) // Fill out the name
            ->type('email', $email) // Fill out the email
            ->press('Salvar') // Click on "Salve"
            ->assertPathIs('/registers') // Test if it was redirected to the list page
            ->assertSee($name) // Test if the name registed is in the list
            ->assertSee($email); // Test if the email registed is in the list
    });
}
```

#### Executing Dusk

To execute all tests implemented with Dusk, simply run the command below:

```shell
$ php artisan dusk
```

To execute a specific test, run the command as follows:

```shell
$ php artisan dusk tests/Browser/RegistersTest.php
```

Result:

![Result of the tests](/images/posts/laravel-dusk/run-all.png)

### Test 2

Now, I want to ensure that the form validation works correctly.

![Form to add items with the validation messages](/images/posts/laravel-dusk/form-validation.png)

For that I wrote the following test:

```
// tests/Browser/RegistersTest

public function testAddRegisterValidation()
{
    $this->browse(function (Browser $browser) {
        $browser->visit('/registers/create') // Access the route of the form
            ->press('Salvar') // Click on "Save" without filling out anything
            ->assertPathIs('/registers/create') // Test if it keeps on the same page
            ->assertSee('The name field is required.') // Test if it shows the error on the name
            ->assertSee('The email field is required.'); // Test if it shows the error on the email
    });
}
```

Result:

![Result of the test](/images/posts/laravel-dusk/run-all-2.png)

### Then

The possibilities are endless. In the future, I will make a second post exploring more resources.

At first glance, this process seems laborious, but, like everything in programming, practice will make it easier and
faster.

As time passes, you no longer worry about having to write tests, but rather, which ones to write to ensure that the most
variable behaviors are covered.

All the code above is available in my [repository](https://github.com/thiagoalves-dev/laravel-storage-example), if you
want to download and test it.

See you later!
