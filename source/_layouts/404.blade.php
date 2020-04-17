@extends('_layouts.master')

@section('body')
    <div class="flex flex-col items-center text-gray-700 mt-32">
        <h1 class="text-6xl font-light leading-none mb-2">404</h1>

        <h2 class="text-3xl">Página não encontrada.</h2>

        <hr class="block w-full max-w-sm mx-auto border my-8">

        <p class="text-xl">
            Para voltar até a página inicial <a href="/" title="{{ $page->siteName }} home" class="cube-palette-2">clique aqui</a>.
        </p>
    </div>
@endsection
