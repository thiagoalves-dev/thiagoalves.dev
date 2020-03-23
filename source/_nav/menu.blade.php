<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} Blog" href="/blog" class="ml-6 cube-palette-2 hover:cube-palette-3 {{ $page->isActive('/blog') ? 'active cube-palette-3' : '' }}">
        + Posts
    </a>

    <a title="{{ $page->siteName }} About" href="/about" class="ml-6 cube-palette-2 hover:cube-palette-3 {{ $page->isActive('/about') ? 'active cube-palette-3' : '' }}">
        Sobre
    </a>
</nav>
