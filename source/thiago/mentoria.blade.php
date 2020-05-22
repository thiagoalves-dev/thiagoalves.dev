---
title: Mentoria
keywords: Mentoria
description: Alguns serviços que ofereço para ajudar outras pessoas a se desenvolverem na programação.
---

@extends('_layouts.master')

@push('meta')
    @include('_third_party_tags.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="text-center">
        <h1>Mentoria</h1>

        <p>
            Como posso te ajudar? <br>
            Escolha um serviço abaixo, veja os detalhes e agende um horário comigo. <br>
            Aulas online, 100% personalizadas e agendadas conforme a disponibilidade do aluno e de horários.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            @include('thiago._layouts.mentory.beginner-hourly')
            @include('thiago._layouts.mentory.advanced-hourly')
            @include('thiago._layouts.mentory.beginner-monthly')
            @include('thiago._layouts.mentory.advanced-monthly')
        </div>
    </div>
@endsection
