---
date: '2020-05-27'
title: '3 tips to avoid code duplication in Laravel'
description: 'One of the unofficial rules of programming says that: the amount of code written is directly linked to the number of errors generated.'
keywords: 'Dry, Clean Code, Route, Resource, Repository'
ptBrSlug: '3-dicas-para-evitar-duplicacao-de-codigo-no-laravel'
---

One of the unofficial rules of programming says that: the amount of code written is directly linked to the number of
errors generated.

This can be questioned a lot, since it is possible to argue that there are a series of other variables and the main one
would be the programmer. Which isn't a lie, but it's not the focus of our conversation.

Reflection on the subject comes from the DRY principle, created
by [Dave Thomas](https://en.wikipedia.org/wiki/Dave_Thomas_(programmer))
and [Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)), which means Don’t Repeat Yourself. Basically, it
means that the sources of knowledge and logic of a system must have a single representation.

In Laravel, three techniques help us a lot in preventing this repeated code. See below:

### Route Binding

Normally, when we pass an ID through routes, it is common for us to use this ID to query an object in the database that
we are going to manipulate for some reason.

```php
// routes/web.php
Route::get('/products/{id}', 'ProductsController@show');

// Controllers/ProductsController
public function show($id)
{
    return App\Product::find($id);
}
```

The problem starts when, in the same controller or others, we have more methods using the same `find` one. Let's
use `bind` to fix this.

```php
Route::get('/products/{product}', 'ProductsController@show');

public function show(App\Product $product)
{
    return $product;
}
```

### Route Resource

In the documentation, you can find this feature
under [Resource Controllers](https://laravel.com/docs/controllers#resource-controllers). A little confusing, in my
opinion. Despite this, it is a very useful function that the framework provides.

I usually say that the first step to keeping a controller well organized is to use the methods considered that come by
default.

Let's continue with the product example and imagine that we need to implement all product maintenance methods. See below
two different ways to create routes for this obtaining the same result.

```php
//ANTES
Route::get('/products', 'ProductsController@index');
Route::get('/products/create', 'ProductsController@create');
Route::post('/products', 'ProductsController@store');
Route::get('/products/{product}', 'ProductsController@show');
Route::get('/products/{product}/edit', 'ProductsController@edit');
Route::put('/products/{product}', 'ProductsController@update');
Route::delete('/products/{product}', 'ProductsController@destroy');

// DEPOIS
Route::resource('products', 'ProductsController');
```

![Lista de rotas geradas](/images/posts/dont-repeat-yourself/route-list.png)

Note that the routes are already generated with the `binding`.

### Repository

There's no point looking in the Laravel documentation, it's not there. This is a practice that many developers in the
community apply, including me.

It involves creating a layer to handle database queries using the Eloquent abstraction.

Imagine that in our system, we need to implement a search by name of active products. Both on the website and in the
administrator area.

Doing this in controllers:

```php
// Site/ProductsController
public function index(Request $request)
{
    $products = App\Product::query()
        ->where('active', true)
        ->where('name', 'like', "%{$request->get('name')}%")
        ->get();

    return view('site.products.index', compact('products'));
}

// Admin/ProductsController
public function index(Request $request)
{
    $products = App\Product::query()
        ->where('active', true)
        ->where('name', 'like', "%{$request->get('name')}%")
        ->get();

    return view('admin.products.index', compact('products'));
}
```

Now let's use a repository to do this in a very basic way.

```php
// app/Repositories/ProductRepository
class ProductRepository
{
    public function searchActiveProducts(string $name)
    {
        return \App\Product::query()
            ->where('active', true)
            ->where('name', 'like', "%$name%")
            ->get();
    }
}

// Site/ProductsController
public function index(Request $request, ProductRepository $repository)
{
    $products = $repository->searchActiveProducts($request->get('name'));

    return view('site.products.index', compact('products'));
}

// Admin/ProductsController
public function index(Request $request, ProductRepository $repository)
{
    $products = $repository->searchActiveProducts($request->get('name'));

    return view('admin.products.index', compact('products'));
}
```

In these cases, the ideal is to implement an API to do this work, but this would imply modifications to the way the
front works, which is not our focus. The most important thing in this example is the unification of the source of
information.

It is also possible to work with repositories in a much more elaborate way. I will share a model for this soon.

### Then

It's part of my daily work to review code written by other people and, when I analyze a pull request, the things that
catch my attention the most are: the lack of standards and duplications.

I confess that it took me a while to worry about this issue, but as I got involved in bigger and more important
projects, the demand arrived.

See you later!
