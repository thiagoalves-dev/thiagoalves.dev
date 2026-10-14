---
title: 'Is a programming degree still worth it in the age of AI?'
description: 'When AI can build entire features in seconds, the four-year computer science syllabus is completely obsolete. What learning to build software takes today.'
date: '2026-05-06'
author: 'Thiago Alves'
---

When I decided to become a programmer eighteen years ago, college felt like the only credible doorway.
I didn't own a computer until I was eighteen, and the industry seemed like an exclusive club where the
rules were only handed out in lecture halls.

I did the whole academic run: a technical diploma followed by a three-year associate degree in Systems Analysis
and Development. Over 3,000 hours sitting in classrooms.

Even before AI, my takeaway was that universities moved too slowly, spent too much time on filler curriculum,
and taught almost nothing about how real software gets built and maintained in production.

Today, with tools that can scaffold entire applications, generate database migrations, and debug errors in seconds,
the traditional four-year degree is completely divorced from reality.

If you want to become a software engineer today, **going to college for programming is the slowest, most expensive
way to get there.**

## What universities spend four years teaching

Look at a typical computer science or software engineering curriculum:

You spend the first year on general education requirements that have nothing to do with programming. You spend
the next two years learning toy algorithmic puzzles, setting up basic development environments, and completing
isolated homework assignments that never see a real user, a production deployment, or a legacy codebase.

That entire loop has been collapsed. An entry-level programmer with an AI assistant can scaffold an authentication
flow, spin up a relational database, and deploy a working prototype before an academic committee finishes debating
next semester's syllabus.

Universities update their course material on a five-year cycle. Software development changes every month.
Paying tens of thousands of dollars to learn how people built software in 2018 is a bad financial investment
and an even worse use of your time.

## What actually gets you hired now

The misconception about programming was always that the job was typing code. It never was. The job has always
been understanding a business problem, designing a reliable system, and taking responsibility when it breaks.

Now that AI can write the initial version of almost any feature in minutes, the bar for human engineers has moved
up, not down. When I hire developers for my team, I don't look for someone who can write an algorithm on a
whiteboard. I look for:

1. **Architectural judgment:** Can you structure a system that doesn't collapse when data volume scales? Do you
   know where the tenant boundaries are, and how authentication actually flows between services?
2. **Skeptical review:** AI generates confident, plausible code that is frequently insecure, inefficient, or subtly
   broken. Can you audit that code, catch the hidden trap, and push back? As I wrote in [how I use AI to review every
   pull request](/journal/how-i-use-ai-to-review-every-pull-request), even an automated reviewer has to prove its
   findings before anyone should trust them.
3. **Execution under real constraints:** What happens when an external API times out? How do you migrate a database
   table with millions of rows without downtime? How do you trace a production bug when the logs are silent?

None of this is taught in lecture halls. It is learned by building, shipping, and breaking real systems.

## What the learning path looks like today

If you are starting from zero right now, you have an advantage no previous generation had. You don't have to wait
for a professor's office hours to ask a question. You have an infinitely patient senior engineer sitting in your
terminal:

### 1. Build real products from day one

Don't spend six months reading theory before writing your first line of code. Pick a concrete problem — a tool for
a local business, an integration you wish existed, a SaaS prototype — and build it.

Use AI to move fast, but never paste code you cannot explain. Make the model explain the trade-offs: *"Why did
you choose this database schema over a normalized structure? What happens to this queue if the worker crashes
mid-job?"*

### 2. Learn systems, not just languages

Languages and frameworks are easier to pick up than ever. What lasts across your career is systems thinking:
how operating systems handle processes, how relational databases execute queries, how HTTP and networking work,
and how automated test suites protect your code from regressions.

### 3. Put software in front of real users

As I shared in [my first experiences as a developer](/journal/my-first-experiences-as-a-developer), my career
only gained momentum when I stopped doing isolated exercises and started dealing with real production code that
clients depended on.

Build three non-trivial applications. Deploy them to production on a cloud host. Connect a real domain. Set up
error monitoring. Find actual users to try them, and fix whatever breaks.

An engineer who can point to three live applications, explain the architectural decisions behind them, and show
how they solved real production failures will beat someone holding a four-year diploma every single time.

## Final thoughts

None of this means you shouldn't go to college.

If walking across that stage, earning a degree, and celebrating that milestone with your family is a personal
dream, that is completely valid. It is an achievement worth being proud of, and nobody can take that away from you.

Just don't confuse personal fulfillment with professional qualification. If your goal is to become a capable
software engineer and land a great job in today's market, college is no longer what gets you there. Building
real systems, understanding how they fail, and shipping software is.
