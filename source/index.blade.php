@extends('_layouts.master')

@push('meta')
    @include('_layouts.third-party-tags.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="w-full mb-6">

    </div>

    @foreach ($posts->where('featured', true) as $featuredPost)
        <div class="w-full mb-6">
            @if($loop->first)
                <img src="{{ $featuredPost->cover_image ?? '/assets/images/banner-1.jpg' }}" alt="Home page cover image" class="mb-6">
            @endif

            <p class="text-gray-700 font-medium my-2">
                {{ $featuredPost->getDateText() }}
            </p>

            <h2 class="text-3xl mt-0">
                <a href="{{ $featuredPost->getUrl() }}" title="Read {{ $featuredPost->title }}" class="text-gray-900 font-extrabold">
                    {{ $featuredPost->title }}
                </a>
            </h2>

            <p class="mt-0 mb-4">{!! $featuredPost->getExcerpt() !!}</p>

            <a href="{{ $featuredPost->getUrl() }}" title="Read - {{ $featuredPost->title }}" class="simple cube-palette-1 tracking-wide mb-4">
                Ler +
            </a>
        </div>

        <hr class="border-b my-6">
    @endforeach

    @foreach ($posts->where('home_block', true)->take(2)->chunk(2) as $row)
        <div class="flex flex-col md:flex-row md:-mx-6">
            @foreach ($row as $post)
                <div class="w-full md:w-1/2 md:mx-6">
                    @include('_components.post-preview-inline')
                </div>

                @if (! $loop->last)
                    <hr class="block md:hidden w-full border-b mt-2 mb-6">
                @endif
            @endforeach
        </div>

        <hr class="w-full border-b mt-2 mb-6">
    @endforeach
@stop
