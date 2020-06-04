---
title: Mentoria
keywords: Mentoria
description: Alguns serviços que ofereço para ajudar outras pessoas a se desenvolverem na programação.
---

@extends('_layouts.master')

@push('meta')
    @include('_layouts.third-party-tags.meta-tags-to-share', ['type' => 'website'])
@endpush

@section('body')
    <div class="text-center">
        <h1>Mentoria</h1>

        <p>
            Escolha um serviço abaixo, veja os detalhes e agende um horário comigo.
        </p>
        <p>
            Aulas online, 100% personalizadas e agendadas conforme a disponibilidade do aluno e de horários.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            @include('thiago._layouts.mentory.beginner-hourly')
            @include('thiago._layouts.mentory.advanced-hourly')
            @include('thiago._layouts.mentory.beginner-monthly')
            @include('thiago._layouts.mentory.advanced-monthly')
        </div>

        <p class="mt-10">
            <a href="#mais-informacoes"
               class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                Quero saber mais informações
            </a>
        </p>

        <h2 class="mt-12">Agendamento</h2>
        <p>Após o pagamento, escolha abaixo uma data e um horário para nossa mentoria.</p>
        <p class="mb-0">
            <strong>Formas de pagamento:</strong>
            Picpay (@thiagomcw), NuConta (Ag. 0001 Cc. 2466279-0) e Boleto
            (<a target="_blank"
                href="https://api.whatsapp.com/send?phone=5547991897941&text=Ol%C3%A1!%20Preciso%20de%20um%20boleto%20para%20pagar%20a%20Mentoria.">solicitar</a>).
        </p>

        @include('thiago._layouts.mentory.calendly-embed')

        <h2 id="mais-informacoes">Mais informações</h2>
        <p>
            No plano mensal, antes de iniciarmos a mentoria de fato, faremos uma conversa para que eu possa entender
            melhor de que forma posso ajudar. <br>
        </p>
        <p>
            No plano mensal, ao final primeira aula, o aluno pode solicitar reembolso e o mesmo é providenciado em até
            24hs.
        </p>
        <p>
            Para esclarecer qualquer dúvida, basta entrar em contato através do meu
            <a href="https://instagram.com/thiagomcw" target="_blank">Instagram</a>.
        </p>
    </div>
@endsection
