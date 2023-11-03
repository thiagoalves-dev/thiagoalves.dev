---
date: '2020-05-13'
title: 'Should you use API Resources with Laravel? Yes!'
description: 'If you work with APIs in your Laravel application and still do not use API Resources, it is very likely that your code is not up to scratch.'
keywords: 'Api, Resources, JSON'
ptBrSlug: 'deveria-usar-api-resources-no-laravel-sim'
---

A few days ago I was browsing [reddit](https://reddit.com) when I came across the following question from a user: "
should I use API Resources?". Many answers emerged, with good arguments, convincing him yes.

My opinion on the subject is very clear: if you work with APIs in your Laravel application and still don't use API
Resources, it's very likely that your code doesn't have these things in place. Unless your methods manipulate very
little data.

As the documentation itself says, this feature allows us to create a transformation layer between the models and the
JSON responses to be returned.

At first glance, it may seem like it doesn't make much difference, especially if you need to return the data the way it
already is, but a few more details are enough for this feature to show its value.

### Let's do it

Our exercise today consists of the following: we need to search for a specific product and its data. Below we have the
models to represent the product and category, in addition to the route of our API method.

```php
// app/Product.php

class Product extends Model
{
    protected $fillable = ['name', 'price'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
```

```php
// app/Category.php

class Category extends Model
{
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

```php
// routes/web.php

Route::get('/products/{product}', 'ProductsController@show');
```

**In the first example, I will implement the method just returning the model data, without any changes:**

```php
// app/Http/Controllers/ProductsController.php

class ProductsController extends Controller
{
    public function show(Product $product)
    {
        return $product;
    }
}
```

Response:

```json
{
    "id": 2,
    "category_id": 1,
    "name": "Juice",
    "price": 4.54,
    "created_at": "2020-05-11T20:22:30.000000Z",
    "updated_at": "2020-05-11T20:22:49.000000Z"
}
```

Even though I don't really agree with the idea, in a case like this, there is actually no need to use API Resource.

By raising the level of demand a little, it is possible to see that our method will need improvements. Imagine that next
to the product, we need to return its category data.

**Let's go**:

```php
// app/Http/Controllers/ProductsController.php

class ProductsController extends Controller
{
    public function show(Product $product)
    {
        return $product->load('category');
    }
}
```

Response:

```json
{
    "id": 2,
    "category_id": 1,
    "name": "Juice",
    "price": 4.54,
    "created_at": "2020-05-11T20:22:30.000000Z",
    "updated_at": "2020-05-11T20:22:49.000000Z",
    "category": {
        "id": 1,
        "name": "Drinks",
        "created_at": "2020-05-11T20:22:16.000000Z",
        "updated_at": "2020-05-11T20:22:57.000000Z"
    }
}
```

Yeah, I confess that it was even better than I imagined (lol), but it's still very basic.

### Let's go to what matters

It's time to be more demanding with our method. Now, the product must have a price option already formatted in reais,
the dates must be in Brazilian reading format and the category must be optional.

**Let's put the API Resource to work for us:**

```php
// app/Http/Controllers/ProductsController.php

public function show(Product $product)
{
    return new \App\Http\Resources\Product($product);
}
```

```php
// app/Http/Resources/Product.php

class Product extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'         => $this->getKey(),
            'name'       => $this->name,
            'price'      => $this->price,
            'price_show' => number_format($this->price, 2, ',', '.'),
            'create_at'  => $this->created_at->format('d/m/Y H:i:s'),
            'category'   => $this->when($request->get('include_category'), function () {
                return new \App\Http\Resources\Category($this->category);
            }),
        ];
    }
}
```

```php
// app/Http/Resources/Category.php

class Category extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'   => $this->getKey(),
            'name' => $this->name,
        ];
    }
}
```

Route: `/products/2?include_category=1`.

Response:

```json
{
    "data": {
        "id": 2,
        "name": "Juice",
        "price": 4.54,
        "price_show": "4,54",
        "create_at": "11/05/2020 20:22:30",
        "category": {
            "id": 1,
            "name": "Drinks"
        }
    }
}
```

Simple, right!?

Now we have a more complete return that we can modify according to the system's current demand.

For me, the biggest benefit is not having to manipulate the data within the controller and still being able to add other
information whenever I need it. For example, in addition to the category, I could return the user who registered the
product in the system.

### Another example

Get a category with its complete list of products:

```php
// routes/web.php

Route::get('/categories/{category}', 'CategoriesController@show');
```

```php
// app/Http/Controllers/CategoriesController.php

class CategoriesController extends Controller
{
    public function show(Category $category)
    {
        return new \App\Http\Resources\Category($category);
    }
}
```

```php 
// app/Http/Resources/Category.php

class Category extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'       => $this->getKey(),
            'name'     => $this->name,
            'products' => $this->when($request->get('include_products'), function () {
                return \App\Http\Resources\Product::collection($this->products);
            }),
        ];
    }
}
```

Route: `/categories/2?include_products=1`.

Response:

```json
{
    "data": {
        "id": 2,
        "name": "Freezing",
        "products": [
            {
                "id": 3,
                "name": "Pizza",
                "price": 10.9,
                "price_show": "10,90",
                "create_at": "11/05/2020 20:22:32"
            },
            {
                "id": 4,
                "name": "French Fries",
                "price": 7.49,
                "price_show": "7,49",
                "create_at": "11/05/2020 20:22:35"
            }
        ]
    }
}
```

Anyway, even if I use a very simple example like this, it's clear how useful this Laravel feature can be.

### Then

I've been using this resource for at least two years without interruption and I've never stopped. No matter how simple
the API method I need to implement, I always end up using Resources.

It is important to make it clear that in the code above, it is possible to make a series of optimizations, but I chose
to try to be more didactic.

All code for the examples is in my [github repository](https://github.com/thiagoalves-dev/laravel-storage-example), if
you want to use it in your tests.

See you later!
