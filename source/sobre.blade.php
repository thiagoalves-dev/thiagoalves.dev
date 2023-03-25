---
title: Sobre
keywords: Sobre
description: Um resumo breve sobre a empresa e os profissionais a idealizaram.
---

@extends('_layouts.master')

@push('meta')
    @include('_layouts.third-party-tags.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="text-center">
        <h1>Sobre</h1>

        <p>A empresa foi fundada em 2017 com a finalidade de prestar serviços de Desenvolvimento de Sistemas para outras
            empresas. Atividade que se mantém até hoje.</p>

        <div class="flex items-center">
            <div class="w-full md:w-1/2 mx-auto">
                @include('_layouts.components.founder-card')
            </div>
        </div>
    </div>
@endsection
