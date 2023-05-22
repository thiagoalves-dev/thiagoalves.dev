<nav class="hidden lg:flex items-center justify-center text-lg w-full">
    <a title="{{ $page->siteName }} | Blog" href="/blog"
       class="ml-6 cube-palette-2 {{ $page->isActive('/blog') ? 'active cube-palette-3' : '' }}">
        Blog
    </a>
    <a title="{{ $page->siteName }} | Sobre" href="/sobre"
       class="ml-6 cube-palette-2 {{ $page->isActive('/sobre') ? 'active cube-palette-3' : '' }}">
        Sobre
    </a>
</nav>
<nav class="hidden lg:flex items-center justify-end text-lg w-1/3">
    <a title="Instagram" href="{{ $page->profile->instagramUrl }}" class="mr-4 opacity-50 hover:opacity-75"
       target="_blank">
        <img class="h-4 mt-1" src="/assets/images/social/instagram.png" alt="">
    </a>
    <a title="LinkedIn" href="{{ $page->profile->linkedinUrl }}" class="mr-4 opacity-50 hover:opacity-75"
       target="_blank">
        <img class="h-4" src="/assets/images/social/linkedin.png" alt="">
    </a>
    <a title="Twitter" href="{{ $page->profile->twitter }}" class="opacity-50 hover:opacity-75" target="_blank">
        <img class="h-3 mt-1" src="/assets/images/social/twitter.png" alt="">
    </a>
</nav>
