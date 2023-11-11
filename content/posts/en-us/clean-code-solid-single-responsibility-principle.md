---
date: '2020-05-02'
title: 'Clean Code: SOLID single responsibility principle'
description: 'The basis for Clean Code is SOLID. So I will exemplify what the first letter of the acronym teaches.'
keywords: 'Clean Code, SOLID, Class'
ptBrSlug: 'clean-code-principio-da-responsabilidade-unica-do-solid'
---

One thing I've studied frequently in recent years and that changed my life as a developer, it's Clean Code.

Few things tend to scare a developer more than maintaining code written a year ago, for example. However, applying the
concepts of Clean Code, this tends to be a lot easier.

I don't mean to say that you won't read your old code and find it "less sophisticated" compared to what you currently
write. After all, we are constantly evolving.

But it's one thing to evolve and quite another to not understand the code you wrote yourself, right?

With that in mind, I’m starting a long series of posts here on the blog addressing this subject.

### What is this Clean Code?

It is nothing more than a programming philosophy that aims to facilitate writing and reading code, making it simple to
understand its function.

### What is SOLID?

**S** - Single responsibility principle <br/>
**O** - Open/closed principle <br/>
**L** - Liskov substitution principle <br/>
**I** - Interface segregation principle <br/>
**D** - Dependency inversion principle

There are five principles of object-oriented programming that serve as the basis for various development patterns and
concepts, including Clean Code.

Introduction made. Let's get to the subject of this post:

### Single Responsibility Principle

In my opinion, the first letter of the SOLID acronym is the most important principle in programming.
Without its application, there is no clean code.

**A class must have only one responsibility, one reason for existing, solving a single problem and, last but not least,
one reason for being changed.**

Imagine that we have a system that calculates the price of products, based on its weight in pounds.

So, let's create a single code to solve this issue and see how it goes.

```php
class Product {
    public $name;

    public $pricePerPound;

    public function calculateProductPrice(float $pounds) {
        return $this->pricePerPound * #pounds;
    }
}
```

At first glance, everything is fine, right!? **Not at all!**

This class is clearly violating the single responsibility principle.

Note that we have a class to represent the product and a method to calculate its final price. In other words, if I
needed to add a new property or change the price calculation rule, I would have two different reasons to modify the
same class.

How would it be correct to do this implementation:

```php
class Product {
    public $name;

    public $pricePerMultiplier;
}

class PriceCalculator {
    public function calculateProductPrice(float $pricePerMultiplier, float $multiplier) {
        return $pricePerMultiplier * $multiplier;
    }
}
```

Now we have two classes with well-defined responsibilities.

### Was it vague?

In fact, this principle is not so simple to understand at the first view. Mainly because the result it generates is more
indirect, let's say.

The main benefit here is to avoid the existence of large and extremely complex classes, simplifying maintenance and
understanding.

As we move further into the Clean Code philosophy, it makes more and more sense.

This topic will still be covered a lot here on the blog. We're just getting started.

See you later!
