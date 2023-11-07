---
date: '2020-06-09'
title: 'Basic concepts about Code Review'
description: 'Code Review boils down to a code review practice, as the name suggests, where a programmer reviews an implementation made by another, with the aim of finding faults in general.'
keywords: 'Code Review, Architecture, Design Patterns, Readability'
ptBrSlug: 'conceitos-basicos-sobre-code-review'
---

One of the ways to maintain the integrity of the code and the team on the same page at the same time is by adhering to
the Code Review practice. This practice has become widespread in recent years and we can now consider it common among
development teams.

On the other hand, it is important to recognize that this is not a very easy process. Many factors can contribute to
making this task difficult, such as: Pull Requests with excessive changes, poorly described commits, lack of definition
of conventions, ego. Therefore, it is very important that the team is aligned in the way they work.

If you have no idea what I'm talking about, Code Review boils down to a code review practice, as the name suggests,
where a programmer reviews an implementation made by another, with the aim of finding faults in general.

One of the ways to structure this review is by dividing it into three segments, where one is a prerequisite for the
other.

### Architecture

Principles, conventions, security, design patterns. The list can be long and will vary greatly according to the rules
established by the team, reinforcing the importance of communication.

At this stage, it is possible to analyze whether the implementation carried out is in accordance with the application
design, whether the system entities and are respected, not containing classes, business rules and functions in
inappropriate locations.

Another important question is whether the tests are compatible with the new features and, of course, whether they
execute correctly. Even to validate that the changes do not harm other areas of the system that already exist.

### Readability

The main code hosting tools, such as Bitbucket, Github and Gitlab, display Pull Requests on a page that looks like an
article divided into chapters, where you can read the modified files, one by one. Which helps a lot when evaluating how
readable the modified code is.

At this point, it's time to analyze whether, when reading the code, it makes it clear what it does. If you are having
difficulty understanding a section, it may need some adjustments. Functions and classes with excessive logic tend to
contribute to poor readability, and this price comes with interest in the future.

### Code formatting and reuse

Starting with a less logical and more aesthetic criterion, so to speak, it's time to analyze how the code is presented
and how reusable it is.

You can analyze here points such as: incompatible comments, indentation, variable naming, non-standard classes and
methods. Currently, there are several tools that make it possible to automate this process, including preventing the
commit from being made. In any case, it's worth checking it out, just in case.

Suggestions for improvements to the logic may also be part of this stage, such as some refactoring that allows the code
to be reused. In fact, these suggestions don't even need to be a prerequisite for the Pull Request to be approved,
unlike the previous ones.

### Then

It is important to highlight that this article was designed in a scenario where there is a development team, where there
are at least two professionals with some experience. Code Review dynamics can vary greatly depending on the team
configuration. It is possible that there is only one professional who reviews the code and establishes the rules, for
example.

If you have any different experience on this subject, share it with us in the comments.

See you later!
