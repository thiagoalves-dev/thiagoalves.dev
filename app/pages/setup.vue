<template>
  <SimpleLayout
    title="The gear and tools I use to get things done."
    intro="Nobody asked 🤷‍♂️, but here it is anyway: the hardware on my desk and the software I spend my days in, each with a quick note on why it’s there."
  >
    <div class="space-y-20">
      <AppSection title="Workstation">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Mac Studio, M2 Max, 32GB RAM</CardTitle>
            <CardDescription
              >My main computer, a little monster that helps me get things done every day.</CardDescription
            >
          </Card>
          <Card as="li">
            <CardTitle as="h3">15” MacBook Air, M5</CardTitle>
            <CardDescription>
              The computer I use when I’m on the road, or when I just want to get out of the office for a bit.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Philips 276E8VJSB, 27” 4K IPS</CardTitle>
            <CardDescription>My pick when I went looking for a budget-friendly 4K monitor.</CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">11” iPad Pro</CardTitle>
            <CardDescription>
              I’m a one-screen person, so this sits under my monitor as a glorified widget: music, my Pomodoro timer,
              and a second screen when I need one.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Keychron K8 Pro</CardTitle>
            <CardDescription>
              I used to think mechanical keyboards were overrated, until I gave this one a shot at replacing my Magic
              Keyboard. Turns out they’re not overrated after all.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Magic Mouse 2</CardTitle>
            <CardDescription
              >I’m not a heavy mouse user, and it plays nice with my Apple gear. Nothing special.</CardDescription
            >
          </Card>
          <Card as="li">
            <CardTitle as="h3">AirPods Pro 2</CardTitle>
            <CardDescription>
              The best earbuds I’ve ever had: great sound, comfortable enough to wear through a full day of meetings,
              and some days I forget they’re in.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Insta360 Link</CardTitle>
            <CardDescription>My daily webcam. Pretty decent, nothing fancy, does the job.</CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">IKEA desk</CardTitle>
            <CardDescription>A cheap short-term fix that ended up staying for years.</CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Sytas ergonomic chair</CardTitle>
            <CardDescription>A budget pick meant to hold me over that’s still with me years later.</CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="Development tools">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Warp and the macOS Terminal</CardTitle>
            <CardDescription>
              Where I fly the spaceship: these days, everything that gets done starts from the terminal.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">DataGrip</CardTitle>
            <CardDescription>
              A fancy database client for the moments that need more than a quick query: digging into the data, or
              running and testing the complex stuff.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Docker</CardTitle>
            <CardDescription>
              A staple for many years: a full local environment up in minutes, with nothing else installed on my
              machine.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="AI">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Claude Code</CardTitle>
            <CardDescription>
              My main tool these days, for writing code and for getting just about everything else done.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">OpenCode</CardTitle>
            <CardDescription
              >The alternative I’ve been testing alongside Claude Code. It’s okay, just not there yet.</CardDescription
            >
          </Card>
          <Card as="li">
            <CardTitle as="h3">Superwhisper</CardTitle>
            <CardDescription>
              The dictation tool I use to make prompting, and writing in general, a lot faster.
            </CardDescription>
          </Card>
        </ul>
      </AppSection>
      <AppSection title="Productivity">
        <ul role="list" class="space-y-16">
          <Card as="li">
            <CardTitle as="h3">Freedom</CardTitle>
            <CardDescription>
              A simple tool that keeps distractions out during the most productive hours of my day.
            </CardDescription>
          </Card>
          <Card as="li">
            <CardTitle as="h3">Forest</CardTitle>
            <CardDescription>My Pomodoro timer: it breaks the work into short, focused sessions.</CardDescription>
          </Card>
        </ul>
      </AppSection>
    </div>
  </SimpleLayout>
</template>

<script setup>
useSeoMeta({
  title: 'Setup',
  description:
    'The hardware on my desk and the software I use every day as a software engineer, each with a short, honest note on why it earned its place.',
  ogTitle: 'Setup',
  ogDescription:
    'The hardware on my desk and the software I use every day as a software engineer, each with a short, honest note on why it earned its place.',
});
</script>
