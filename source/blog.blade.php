---
pagination:
    collection: posts
    perPage: 4

title: Blog
keywords: Blog
description: Postagens frequentes e dicas práticas para ajudar desenvolvedores de diferentes níveis.
---
@extends('_layouts.master')

@push('meta')
    @include('_layouts.partials.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <h1>Blog</h1>

    <hr class="border-b my-6">

    @foreach ($pagination->items as $post)
        @include('_components.post-preview-inline')

        @if ($post != $pagination->items->last())
            <hr class="border-b my-6">
        @endif
    @endforeach

    @if ($pagination->pages->count() > 1)
        <nav class="flex text-base my-8">
            @if ($previous = $pagination->previous)
                <a href="{{ $previous }}" title="Previous Page" class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                    &LeftArrow;
                </a>
            @endif

            @foreach ($pagination->pages as $pageNumber => $path)
                <a href="{{ $path }}" title="Go to Page {{ $pageNumber }}" class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3 {{ $pagination->currentPage === $pageNumber ? 'bg-white' : '' }}">
                    {{ $pageNumber }}
                </a>
            @endforeach

            @if ($next = $pagination->next)
                <a href="{{ $next }}" title="Next Page" class="bg-cube-palette-1-200 hover:bg-white cube-palette-3 rounded mr-3 px-5 py-3">
                    &RightArrow;
                </a>
            @endif
        </nav>
    @endif
@stop
