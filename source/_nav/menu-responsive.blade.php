<nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
    <ul class="my-0">
        <li class="pl-4">
            <a title="{{ $page->siteName }} Blog" href="/blog" class="nav-menu__item cube-palette-2 hover:cube-palette-3 {{ $page->isActive('/blog') ? 'active cube-palette-3' : '' }}">
                Blog
            </a>
        </li>
    </ul>
</nav>
