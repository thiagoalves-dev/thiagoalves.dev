---
title: Sobre
keywords: Sobre
description: Um resumo breve sobre a empresa e os profissionais a idealizaram.
---

@extends('_layouts.master')

@push('meta')
    @include('_third_party_tags.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="text-center">
        <h1>Sobre</h1>

        <p>A empresa foi fundada em 2017 com a finalidade de prestar serviços de Desenvolvimento de Sistemas para outras
            empresas. Atividade que se mantém até hoje.</p>

        <h3 class="mt-16 mb-5">Idealizadores</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            @foreach($founders as $founder)
                @include('_layouts.partials.founder-card', compact('founder'))
            @endforeach
        </div>
    </div>
@endsection
