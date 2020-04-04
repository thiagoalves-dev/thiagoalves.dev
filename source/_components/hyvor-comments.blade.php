<div id="hyvor-talk-view"></div>
<script type="text/javascript">
    let HYVOR_TALK_WEBSITE = 386;
    let HYVOR_TALK_CONFIG = {
        url: '{{ $page->getUrl() }}',
        id: '{{ $page->getDate()->format('Y-m-d H:i:s') }}'
    };
</script>
<script async type="text/javascript" src="//talk.hyvor.com/web-api/embed"></script>