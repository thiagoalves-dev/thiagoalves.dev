<template>
    <div v-if="isProduction">
        <div id="disqus_thread"></div>
        <div v-once v-html="noscriptTag"/>
    </div>
</template>

<script setup>

const noscriptTag = '<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>';
const isProduction = (process.env.NODE_ENV === 'production');

onMounted(() => {
    if (isProduction) {
        (function () {
            let d = document, s = d.createElement('script');
            s.src = 'https://thiagoalves-dev.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }
})

</script>
