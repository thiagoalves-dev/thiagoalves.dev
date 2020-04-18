---
title: Sobre
keywords: Sobre
description: Um resumo breve sobre a empresa e os profissionais a idealizaram.
---

@extends('_layouts.master')

@push('meta')
    @include('_layouts.partials.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="text-center">
        <h1>Sobre</h1>

        <p>A empresa foi fundada em 2017 com a finalidade de prestar serviços de Desenvolvimento de Sistemas para outras
            empresas. Atividade que se mantém até hoje.</p>

        <h3 class="mt-16">Idealizadores</h3>

        <div class="md:flex bg-white rounded-lg p-6">
            <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
                 src="/assets/images/mastercode.png">
            <div class="text-center md:text-left">
                <h2 class="text-lg">Erin Lindford</h2>
                <div class="text-purple-500">Customer Support</div>
                <div class="text-gray-600">erinlindford@example.com</div>
                <div class="text-gray-600">(555) 765-4321</div>
            </div>
        </div>
    </div>
@endsection
