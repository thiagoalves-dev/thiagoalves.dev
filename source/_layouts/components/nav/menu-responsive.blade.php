<nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
    <ul class="my-0">
        <li class="pl-4">
            <a title="{{ $page->siteName }} Blog" href="/blog"
               class="nav-menu__item cube-palette-2 hover:cube-palette-3 {{ $page->isActive('/blog') ? 'active cube-palette-3' : '' }}">
                Blog
            </a>
        </li>

        <li class="pl-4">
            <a title="{{ $page->siteName }} Sobre" href="/sobre"
               class="nav-menu__item cube-palette-2 hover:cube-palette-3 {{ $page->isActive('/sobre') ? 'active cube-palette-3' : '' }}">
                Sobre
            </a>
        </li>
        <li class="pl-4 flex items-center justify-center">
            <a title="Instagram" href="{{ $page->profile->instagramUrl }}"
               class="inline-block mr-4 opacity-50 hover:opacity-75" target="_blank">
                <img class="h-4 mt-1" src="/assets/images/social/instagram.png" alt="">
            </a>
            <a title="LinkedIn" href="{{ $page->profile->linkedinUrl }}"
               class="inline-block mr-4 opacity-50 hover:opacity-75"
               target="_blank">
                <img class="h-4" src="/assets/images/social/linkedin.png" alt="">
            </a>
            <a title="Twitter" href="{{ $page->profile->twitter }}" class="inline-block opacity-50 hover:opacity-75"
               target="_blank">
                <img class="h-3 mt-1" src="/assets/images/social/twitter.png" alt="">
            </a>
        </li>
    </ul>
</nav>
