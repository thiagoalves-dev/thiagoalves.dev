<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} | Blog" href="/blog" class="ml-6 cube-palette-2 {{ $page->isActive('/blog') ? 'active cube-palette-3' : '' }}">
        Blog
    </a>
    <a title="{{ $page->siteName }} | Sobre" href="/sobre" class="ml-6 cube-palette-2 {{ $page->isActive('/sobre') ? 'active cube-palette-3' : '' }}">
        Sobre
    </a>
</nav>
