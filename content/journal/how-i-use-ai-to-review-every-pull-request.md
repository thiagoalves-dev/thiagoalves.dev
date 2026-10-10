---
title: 'How I use AI to review every pull request'
description: 'An agent reviews every pull request before a person does. What it looks for, what it refuses to say, and why a false blocking finding costs more than a missed bug.'
date: '2026-09-09'
author: 'Thiago Alves'
---

Every pull request on my team gets reviewed by an agent before a person opens it. It reads the diff, checks it
against the repository's own written conventions, argues with itself about what it found, and posts one comment with
a verdict.

It has been running long enough that I no longer read every backend PR myself, which was the point. What follows is
what I got wrong on the way there, because the interesting parts were never the prompt.

## Three layers, and only one of them is a person

Code review used to be one activity. It is now three, stacked, and each one exists to stop the layer above it wasting
someone's attention.

**Formatting and style** is a linter in CI. Not a person, and not the agent either. If an opinion about indentation
reaches either of them, the pipeline is broken. This is the layer everyone has already solved and some teams still
argue in.

**Conventions, architecture and known failure classes** is the agent. These work well precisely because they are
written down somewhere — and if they are not written down, the agent is the forcing function that makes you write
them.

**Intent** is the human. Should this exist? Is this the right trade? Does the product actually want this behaviour?
No model has the context to answer that, and pretending otherwise is how you end up with a rubber stamp.

The ordering matters. If the design is wrong, a comment about a variable name is worse than useless — it implies the
design passed.

## Ground it in your rules, not the model's

The first version reviewed pull requests using the model's general knowledge of the framework. The comments were
articulate, plausible, and worthless. It suggested patterns we had deliberately rejected, flagged idioms that are
house style, and missed the things that actually hurt us.

The fix was to stop asking it what good code looks like and start telling it. The agent's first instruction is to
read the repository's own conventions documentation and everything it links to, then review against that.

This has a side effect worth more than the reviews. Any rule you cannot write down, the agent cannot enforce — so
every disagreement about style ends in either a documented rule or an admission that it was never a rule, just a
preference. That conversation was overdue on my team by about four years.

## Name the failure classes

"Review this pull request" produces a review of whatever the model finds interesting. What you want is a review of
the things that have bitten you.

Mine are specific: data crossing a tenant boundary, a new structure built parallel to an entity that already exists,
authorization checked at one of the two levels it needs, a method or table duplicating one already in the codebase,
and anything on the repository's list of banned patterns.

That list came from production incidents and from review comments I found myself writing repeatedly. It is not a
theory of good code. It is a list of ways this particular system has actually gone wrong.

## A false blocking finding costs more than a missed bug

This is the thing I would tell anyone building one of these.

An automated reviewer that raises a confident, wrong, blocking objection teaches the team a lesson in about two
weeks: this thing cries wolf, skim it. Once that happens, the quality of the reviews stops mattering, because nobody
is reading them carefully.

So the calibration is deliberately asymmetric. A blocking finding requires concrete evidence with citable lines.
Anything inferred, suspected or reasoned-toward gets downgraded and **phrased as a question** instead of an
assertion. "Is this intentional?" costs the author ten seconds. "This is a security hole" costs them ten seconds, an
argument, and a little of their willingness to read the next one.

Severity also has teeth. Only blocking findings reject a pull request. Everything else is information.

## Make it argue with itself

The review pass is not the last word. Every finding goes to a second, skeptical pass whose only job is to audit the
first one against the actual code and return one of three answers: verified, refuted, or uncertain. It is explicitly
told to say uncertain when it can neither prove nor disprove something — an out that makes the other two answers
mean something.

The reconciliation is where the thinking is:

```python
for finding in findings:
    verdict = refuter_verdicts.get(finding["i"])

    if verdict == "refuted":
        continue                      # drop it entirely
    if verdict == "uncertain":
        finding["uncertain"] = True   # keep it, flag it
    kept.append(finding)              # anything else: keep, unchanged
```

That last line is the important one. If the refuter returns nothing, returns a shape nobody expected, or errors
outright, the finding survives **at its original severity**. A malfunctioning skeptic must never be able to quietly
downgrade a real blocking finding into a question. The whole block is wrapped in a `try`, and the `except` keeps
everything.

Every failure mode in that function has been chosen. It fails toward noise, never toward silence.

## Let code decide the verdict

The model proposes a verdict. It does not get to hold it.

After reconciliation, a few lines of Python recompute it: rejected if and only if a finding is blocking and not
flagged uncertain. That is the one decision I did not want a language model making on a bad day, and it is four
lines.

Carried-over findings count the same as new ones. There is no "we already mentioned this" discount — if the problem
is still in the diff, the verdict still reflects it.

## Humans can overrule it. The author is not a human.

A reviewer nobody can overrule is a tyrant, and one anybody can overrule is decoration.

So dismissals are honoured: if a maintainer says a finding is wrong, the re-review lists it under dismissed and does
not raise it again. That single behaviour did more for adoption than any improvement to review quality, because it
turned the bot from something that happens to you into something you can answer.

The list of people who can dismiss is built in code, not decided by the model, and it excludes two groups: other
bots, and the pull request's own author. Nobody dismisses findings on their own work. That was not a hypothetical —
it is the first thing anyone tries.

## What it is still bad at

It cannot tell you the feature is a bad idea. It cannot tell you this abstraction will be painful in six months
because it has not seen the six months. It cannot tell you the ticket was wrong.

It also cannot merge anything, which is a design decision rather than a limitation. The layer that has the context
to approve is the layer that has the context to be accountable, and that is still a person.

What changed is what that person spends their attention on. Before, it went on conventions, naming, missing
authorization checks and the same four comments I had written a hundred times. Now it goes on whether we should be
building this at all — which is the only part of code review I was ever any good at.
