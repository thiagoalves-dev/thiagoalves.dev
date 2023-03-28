<!DOCTYPE html>
<html lang="en">
<head>
    @include('_layouts.third-party-tags.google-tag-manager-head')
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="apple-mobile-web-app-title"
          content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}">
    <meta name="keywords" content="{{ $page->siteKeywords }}{{ $page->keywords ? ', '. $page->keywords : '' }}">
    <meta name="description" content="{{ $page->description ?? $page->siteDescription }}">

    @stack('meta')

    <link rel="home" href="{{ $page->baseUrl }}">
    <link rel="canonical" href="{{ $page->baseUrl }}">
    <link rel="icon" href="/assets/images/programming-logo-100.jpg" type="image/x-icon">
    <link rel="shortcut icon" href="/assets/images/programming-logo-100.png">

    <title>{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}</title>

    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,700,700i,800,800i"
          rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
</head>

<body class="flex flex-col justify-between min-h-screen bg-cube-palette-1-100 text-gray-800 leading-normal font-sans">
@include('_layouts.third-party-tags.google-tag-manager-body')
<header class="flex items-center shadow bg-white border-b h-24 py-4" role="banner">
    <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
        <div class="flex items-center">
            <a href="/" title="{{ $page->siteName }} home"
               class="inline-flex items-center simple cube-palette-1">
                <img class="h-8 md:h-10 mr-3" src="/assets/images/programming-logo-800.png"
                     alt="{{ $page->siteName }} logo"/>
                THIAGO ALVES .DEV
            </a>
        </div>

        <div id="vue-search" class="flex flex-1 justify-end items-center">
            @include('_layouts.components.nav.menu')

            @include('_layouts.components.nav.menu-toggle')
        </div>
    </div>
</header>

@include('_layouts.components.nav.menu-responsive')

<main role="main" class="flex-auto w-full container max-w-4xl mx-auto py-16 px-6">
    @yield('body')
</main>

<footer class="text-center text-sm mt-12 py-4" role="contentinfo">
    <ul class="flex flex-col md:flex-row justify-center list-none">
        <li class="md:mr-2">
            &copy; Mastercode Web LTDA {{ date('Y') }}.
        </li>

        <li>
            Desenvolvido com
            <a href="http://jigsaw.tighten.co" class="simple cube-palette-1 hover:underline" target="_blank"
               title="Jigsaw by Tighten">Jigsaw</a>
            e
            <a href="https://tailwindcss.com" class="simple cube-palette-1 hover:underline" target="_blank"
               title="Tailwind CSS, a utility-first CSS framework">Tailwind CSS</a>.
        </li>
    </ul>
    <a href="mailto:{{ $page->profile->contactEmail }}">{{ $page->profile->contactEmail }}</a>
    <br><br>
    <a href="{{ $page->profile->githubUrl }}" target="_blank">
        <img src="/assets/images/social/github.min.svg" alt="Github" class="inline"/>
    </a>
</footer>

<script src="{{ mix('js/main.js', 'assets/build') }}"></script>

@stack('scripts')
</body>
</html>
