@extends('_layouts.master')

@push('meta')
    @include('_layouts.third-party-tags.meta-tags-to-share', ['type' => 'article'])
@endpush

@section('body')
    @if ($page->cover_image)
        <img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2">
    @endif

    <h1 class="leading-none mb-2">{{ $page->title }}</h1>

    <p class="text-gray-700 text-xl md:mt-0">{{ $page->author }} • {{ $page->getDateText() }}</p>

    <div class="border-b border-cube-palette-1-200 mb-10 pb-4" v-pre>
        @yield('content')
    </div>

    <nav class="flex justify-between text-sm md:text-base mb-10">
        <div>
            @if ($next = $page->getNext())
                <a href="{{ $next->getUrl() }}" class="cube-palette-2" title="Older Post: {{ $next->title }}">
                    &LeftArrow; {{ $next->title }}
                </a>
            @endif
        </div>

        <div>
            @if ($previous = $page->getPrevious())
                <a href="{{ $previous->getUrl() }}" class="cube-palette-2" title="Newer Post: {{ $previous->title }}">
                    {{ $previous->title }} &RightArrow;
                </a>
            @endif
        </div>
    </nav>

    <div class="flex items-center">
        <div class="w-full md:w-1/2 mx-auto">
            @include('_layouts.components.founder-card')
        </div>
    </div>

    <p class="text-gray-700 text-xs text-center">
        Comente abaixo o que você achou deste post, se ficou com alguma dúvida ou se gostaria de sugerir algum assunto.
    </p>

    @include('_layouts.third-party-tags.disqus-comments')
@endsection
