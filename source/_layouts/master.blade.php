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

<footer class="text-center text-sm mt-12 py-2" role="contentinfo">
    <ul class="justify-center list-none">
        <li>
            <a class="text-gray-600"
               href="mailto:{{ $page->profile->contactEmail }}">{{ $page->profile->contactEmail }}</a>
        </li>
        <li class="mt-3 flex items-center justify-center">
            <a href="{{ $page->profile->githubUrl }}" class="inline-block mr-4 opacity-50 hover:opacity-75"
               target="_blank">
                <img src="/assets/images/social/github.min.svg" alt="Github" class="h-4 mt-1"/>
            </a>
            <a title="Instagram" href="{{ $page->profile->instagramUrl }}"
               class="inline-block mr-4 opacity-50 hover:opacity-75" target="_blank">
                <img class="h-4 mt-1" src="/assets/images/social/instagram.png" alt="">
            </a>
            <a title="LinkedIn" href="{{ $page->profile->linkedinUrl }}"
               class="inline-block mr-4 opacity-50 hover:opacity-75"
               target="_blank">
                <img class="h-4" src="/assets/images/social/linkedin.png" alt="">
            </a>
            <a title="Twitter" href="{{ $page->profile->twitterUrl }}" class="inline-block opacity-50 hover:opacity-75"
               target="_blank">
                <img class="h-3 mt-1" src="/assets/images/social/twitter.png" alt="">
            </a>
        </li>
    </ul>
    <ul class="flex flex-col md:flex-row text-xs justify-center list-none mt-8">
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
</footer>

<script src="{{ mix('js/main.js', 'assets/build') }}"></script>

@stack('scripts')
</body>
</html>
