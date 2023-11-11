---
date: '2020-05-22'
title: '5 thoughts on comments in code'
description: 'Any programmer with some experience, especially one who has worked in a team, must have come across some comment like: "do not touch it", "this is where the magic happens" or "I do not know what this does".'
keywords: 'Code, Comments, Readability, Bugs, Config'
ptBrSlug: '5-reflexoes-sobre-comentarios-no-codigo'
---

Any programmer with some experience, especially one who has been part of a team, must have come across some comment
like: "don't touch it", "this is where the magic happens" or "I don't know what this does". It's kind of traditional.

Behind this harmless and even funny practice, many problems may have been hidden in the code. In this post, I bring some
reflections full of concepts and my opinion about this topic.

### Code readability

If you just wrote a code and it was so complex that you had to make comments to explain what it does, most likely you
method is not readable enough.

Review your code, looking for things that can be improved, specially in terms of readability. Bad nomenclatures,
excessive logic and conditions usually make the code more difficult to be read.

Don't forget that someone will need to maintain this logic, including yourself.

### Lying comments

Find the error in the comment below:

```php
// Returns the current formatted date
public function getCurrentMonth() {
    return \Carbon\Carbon::now()->format('m');
}
```

It may seem silly, but imagine you correcting an error that is happening in production, the logic where the problem is
consumes the method above, and it wasn't even you who implemented it. Basically, this can determine whether the problem
will affect a few users or a few hundred because of the time lost during the fix.

### Outdated comments

For me, this topic itself is enough to argue that comments should not be made in the code.

In my experience, I was never helped by a comment and, the main reason, was that it was no longer consistent with the
implemented logic, because it had changed at some point.

It's always the same story: some guy writes that method with dozens of lines code and other dozens of lines of comments
to explain what it all does, a fix is necessary, it is made, but the comment is not updated. The rest is history (lol).

### The best medicine is prevention

Some points that contribute to the creation of comments: large methods, classes with excessive logic, naming of classes,
variables and methods incompatible with their practical function. Taking extra care with these issues helps a lot.
Example below.

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

You, young grasshopper, at the PEAK OF THE BEGINNING of your career as a programmer, are reading this post and feeling
terrified because you comment on every line of code you write, even those native functions of the language, so you don't
forget what they do. Relax, everything in its own time. The most important thing now is your progress. Over time,
this begins to lose its meaning. Just be aware of seeking the necessary evolution to abandon this practice.

**Bugs**

The system is broken in production, many users being affected, and you know that a small naughty hack is going
to stop the bleeding? Do it and use a comment to signal the need to refactor that piece of code, but don't forget to
set a task for this in case it is not possible to work on that at the moment.

**Config**

In some frameworks, such as Laravel, we commonly see configuration files full of comments explaining how each parameter
operates and what its customization options are. As these files are rarely changed, there is no problem. Replicating
this practice in your files may also be a good idea.

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

There are those who think this is a complete nonsense. The famous fashion invention. If that's your case, that's fine,
work however you prefer.

Anyway, as I usually say when discussing professional concepts with colleagues, the most important thing is to keep an
open mind to the possibilities.

See you later!
