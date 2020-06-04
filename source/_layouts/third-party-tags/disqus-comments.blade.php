@if ($page->production)
<div id="disqus_thread"></div>
<script>
    let disqus_config = function () {
        this.page.url = '{{ $page->getUrl() }}';
        this.page.identifier = '{{ $page->getDate()->format('Y-m-d H:i:s') }}';
    };

    (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://mastercode-dev.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
@endif