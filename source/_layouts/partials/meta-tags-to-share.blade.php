<meta property="og:type" content="{{ @$type }}" />
<meta property="og:url" content="{{ $page->getUrl() }}"/>
<meta property="og:site_name" content="{{ $page->siteName }}">
<meta property="og:image" content="{{ $page->cover_image ?? $page->siteImage }}" />
<meta property="og:description" content="{{ $page->description ?? $page->siteDescription }}" />
<meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}"/>

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image:alt" content="{{ $page->description ?? $page->siteDescription }}">