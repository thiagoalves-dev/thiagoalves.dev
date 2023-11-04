---
date: '2020-05-22'
title: '5 thoughts on comments in code'
description: 'Any programmer with some experience, especially one who has worked in a team, must have come across some comment like: "do not touch it", "this is where the magic happens" or "I do not know what this does".'
keywords: 'Code, Comments, Readability, Bugs, Config'
ptBrSlug: '5-reflexoes-sobre-comentarios-no-codigo'
---

Any programmer with some experience, especially one who has worked in a team, must have come across some comment like: "
don't touch it", "this is where the magic happens" or "I don't know what this does". It's almost a tradition now.

Behind this harmless and even funny practice, at first glance, a series of problems could be hiding in the code. In this
post, I bring some reflections full of concepts and my opinion on the topic.

### Code readability

If you just wrote a code and it was so complex that you had to make comments to explain what it does, most likely the
problem is that it is not readable enough.

Make revisions to what you wrote, looking for areas for improvement and thinking that, some time later, someone will
need to modify this logic, including yourself.

### Lying comments

Find the error in the comment below:

```php
// Returns the current formatted date
public function getCurrentMonth() {
    return \Carbon\Carbon::now()->format('m');
}
```

It may seem silly, but imagine you correcting an error that happens in production, the broken logic consumes the
method above, and it wasn't even you who implemented it. Basically, this can determine whether the problem will affect a
few users or a few hundred because of the time lost during the fix.

### Outdated comments

For me, this topic alone is enough to argue that comments should not be used.

In my experience, I was never helped by a comment and, the main reason, was that it was no longer consistent with the
implemented logic, because it had changed at some point.

It's always the same story: the guy writes that method with dozens of lines and dozens of other lines to explain what it
all does, a correction is necessary, it is made, but the comment is not updated. The rest is history (lol).

### The best medicine is prevention

It sounds like [Drauzio Varella](https://pt.wikipedia.org/wiki/Drauzio_Varella) saying, "but it's true".

Some factors that contribute to the creation of comments: very large methods, classes with excessive logic, class
naming, variables and methods incompatible with their practical function. Taking extra care with these issues helps a
lot. Example below.

```php
// BEFORE
// Check if the product is active
function check($object) {
    return $object->status === 'active';
}

// LATER
function isActive(Product $product) {
    return $product->status === 'active';
}
```

### When comments are acceptable

**Begginers**

You, young grasshopper, at the HEIGHT OF THE BEGINNING of your career as a programmer, are reading this post and feeling
terrified because you comment on every line of code you write, even those native functions of the language so as not to
forget what they do. Rest assured, everything in its own time. The most important thing now is your progress. Over time,
this begins to lose its meaning. Just be aware of seeking the necessary evolution to abandon this practice.

**Bugs**

The system is giving errors in production, many users are being affected, and you know that that naughty hack is going
to stop the bleeding? Do it and use a comment to signal the need to refactor that piece of code, but don't forget to
already put a task in the queue to do this, if it is not possible to refactor at the moment.

**Config**

In some frameworks, such as Laravel, it is common for there to be some configuration files full of comments explaining
how each parameter operates and what its customization options are. As these are files that rarely change, there are no
problems. Replicating this practice in your files can also be a good idea.

```php
/*
|--------------------------------------------------------------------------
| Application Timezone
|--------------------------------------------------------------------------
|
| Here you may specify the default timezone for your application, which
| will be used by the PHP date and date-time functions. We have gone
| ahead and set this to a sensible default for you out of the box.
|
*/

'timezone' => 'Europe/London',
```

### Then

There are those who think this is complete nonsense. The famous fashion invention. If that's your case, that's fine,
work however you see fit.

Anyway, as I usually say when discussing professional concepts with colleagues, the most important thing is to keep an
open mind to the possibilities.

See you later!
