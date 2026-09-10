<template>
  <SimpleLayout
    title="I’ve spoken at events all around the world and been interviewed for many podcasts."
    intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
  >
    <div class="space-y-20">
      <AppSection title="Conferences">
        <div class="space-y-16">
          <Card as="article">
            <CardTitle as="h3" to="#">In space, no one can watch you stream — until now</CardTitle>
            <CardEyebrow decorate>SysConf 2021</CardEyebrow>
            <CardDescription>
              A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live
              video back to Earth.
            </CardDescription>
            <CardCta>Watch video</CardCta>
          </Card>
          <Card as="article">
            <CardTitle as="h3" to="#">Lessons learned from our first product recall</CardTitle>
            <CardEyebrow decorate>Business of Startups 2020</CardEyebrow>
            <CardDescription>
              They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re
              selling DIY space shuttle kits it turns out it’s a bit more complicated.
            </CardDescription>
            <CardCta>Watch video</CardCta>
          </Card>
        </div>
      </AppSection>
      <AppSection title="Podcasts">
        <div class="space-y-16">
          <Card as="article">
            <CardTitle as="h3" to="#">Using design as a competitive advantage</CardTitle>
            <CardEyebrow decorate>Encoding Design, July 2022</CardEyebrow>
            <CardDescription>
              How we used world-class visual design to attract a great team, win over customers, and get more press for
              Planetaria.
            </CardDescription>
            <CardCta>Listen to podcast</CardCta>
          </Card>
          <Card as="article">
            <CardTitle as="h3" to="#">Bootstrapping an aerospace company to $17M ARR</CardTitle>
            <CardEyebrow decorate>The Escape Velocity Show, March 2022</CardEyebrow>
            <CardDescription>
              The story of how we built one of the most promising space startups in the world without taking any capital
              from investors.
            </CardDescription>
            <CardCta>Listen to podcast</CardCta>
          </Card>
          <Card as="article">
            <CardTitle as="h3" to="#">Programming your company operating system</CardTitle>
            <CardEyebrow decorate>How They Work Radio, September 2021</CardEyebrow>
            <CardDescription>
              On the importance of creating systems and processes for running your business so that everyone on the team
              knows how to make the right decision no matter the situation.
            </CardDescription>
            <CardCta>Listen to podcast</CardCta>
          </Card>
        </div>
      </AppSection>
    </div>
  </SimpleLayout>
</template>

<script setup>
useSeoMeta({
  title: 'Speaking',
  description: 'I’ve spoken at events all around the world and been interviewed for many podcasts.',
});
</script>
