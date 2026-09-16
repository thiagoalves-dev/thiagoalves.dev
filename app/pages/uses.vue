<template>
  <SimpleLayout
    title="Software I use, gadgets I love, and other things I recommend."
    intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
  >
    <div class="space-y-20">
      <AppSection title="Workstation">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">16” MacBook Pro, M1 Max, 64GB RAM (2021)</CardTitle>
            <CardDescription>
              I was using an Intel-based 16” MacBook Pro prior to this and the difference is night and day. I’ve never
              heard the fans turn on a single time, even under the incredibly heavy loads I put it through with our
              various launch simulations.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Apple Pro Display XDR (Standard Glass)</CardTitle>
            <CardDescription>
              The only display on the market if you want something HiDPI and bigger than 27”. When you’re working at
              planetary scale, every pixel you can get counts.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">IBM Model M SSK Industrial Keyboard</CardTitle>
            <CardDescription>
              They don’t make keyboards the way they used to. I buy these any time I see them go up for sale and keep
              them in storage in case I need parts or need to retire my main.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Apple Magic Trackpad</CardTitle>
            <CardDescription>
              Something about all the gestures makes me feel like a wizard with special powers. I really like feeling
              like a wizard with special powers.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Herman Miller Aeron Chair</CardTitle>
            <CardDescription>
              If I’m going to slouch in the worst ergonomic position imaginable all day, I might as well do it in an
              expensive chair.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="Development tools">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Sublime Text 4</CardTitle>
            <CardDescription>
              I don’t care if it’s missing all of the fancy IDE features everyone else relies on, Sublime Text is still
              the best text editor ever made.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">iTerm2</CardTitle>
            <CardDescription>
              I’m honestly not even sure what features I get with this that aren’t just part of the macOS Terminal but
              it’s what I use.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">TablePlus</CardTitle>
            <CardDescription>
              Great software for working with databases. Has saved me from building about a thousand admin interfaces
              for my various projects over the years.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="Design">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Figma</CardTitle>
            <CardDescription>
              We started using Figma as just a design tool but now it’s become our virtual whiteboard for the entire
              company. Never would have expected the collaboration features to be the real hook.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="Productivity">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Alfred</CardTitle>
            <CardDescription>
              It’s not the newest kid on the block but it’s still the fastest. The Sublime Text of the application
              launcher world.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Reflect</CardTitle>
            <CardDescription>
              Using a daily notes system instead of trying to keep things organized by topics has been super powerful
              for me. And with Reflect, it’s still easy for me to keep all of that stuff discoverable by topic even
              though all of my writing happens in the daily note.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">SavvyCal</CardTitle>
            <CardDescription>
              Great tool for scheduling meetings while protecting my calendar and making sure I still have lots of time
              for deep work during the week.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Focus</CardTitle>
            <CardDescription>
              Simple tool for blocking distracting websites when I need to just do the work and get some momentum going.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
    </div>
  </SimpleLayout>
</template>

<script setup>
useSeoMeta({
  title: 'Uses',
  description: 'Software I use, gadgets I love, and other things I recommend.',
});
</script>
