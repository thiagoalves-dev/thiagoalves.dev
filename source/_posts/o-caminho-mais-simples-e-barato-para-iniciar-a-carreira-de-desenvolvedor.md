---
extends: _layouts.post
section: content
published: true

date: 2020-04-30
author: Thiago Alves
title: O caminho mais simples e barato para iniciar a carreira de Desenvolvedor
description: "Uma das principais portas de entrada no mundo da programação. HTML e CSS são as linguagens mais intuitivas
do mercado."
keywords: Carreira, Desenvolvedor
---

Ultimamente, muitas pessoas vieram até mim com as seguintes perguntas: que faculdade tenho que fazer? o curso tal é bom?
por onde começo? é muito difícil fazer o que você faz?

Inclusive, esse foi um dos motivos pelos quais resolvi começar um blog e, obviamente, este post aqui.

A verdade é que não existe uma forma correta ou a que dê mais certo. É possível começar pelos cursos de formação
tradicionais ou totalmente do zero, sem nunca entrar numa sala de aula.

Se você tem desejo ou condições de fazer uma faculdade, nada contra. Agora, isso não será decisivo para torná-lo um
profissional de alto nível no ramo.

### Que caminho eu segui?

**Nessa ordem:**

- Curso técnico;
- Tecnólogo e estágio conciliados;
- Primeiro emprego;

### Então estou me contradizendo?

Sim e não. Fiz o caminho considerado tradicional, é verdade, mas estamos falando de treze anos atrás. Atualmente, as
pessoas estão infinitamente mais familiarizadas com a tecnologia e os computadores se tornaram verdadeiros
eletrodomésticos.

Se eu te falar que vi um amigo que trabalhava como técnico agrícola virar um desenvolvedor _sênior_ sem fazer um curso
sequer?

Pois é, e ele seguiu o caminho que sugiro abaixo.

### Comece pelo front-end!

**O que é front-end?**

Basicamente, se trata da programação visual de um site ou sistema web.

Quando você acessa um site, tudo que vê nada mais é do que um código que foi interpretado pelo navegador. As cores, o
tamanho dos elementos, as imagens, os _links_. De alguma forma, tudo passou por um desenvolvedor e faz parte do que
chamamos de _front-end_.

O código se divide em duas linguagens:   
**HTML** - estruturação: é o que uso para definir o que deve aparecer na tela, como: um botão.  
**CSS** - estilização: é o que uso para definir como a estrutura deve aparecer na tela, como: a cor do botão.

Existe uma terceira, mas não é essencial para o momento.

### Na prática

A imagem abaixo é um _print_ do meu navegador exibindo uma página de exemplo. Nela temos um texto com um _link_ no meio
e um botão abaixo.

<a href="/assets/images/post-start-developer-career/example.png" target="_blank" title="Clique para ampliar a imagem">
    <img src="/assets/images/post-start-developer-career/example.png" alt="Print do navegador" />
</a>

Agora, veja abaixo o código que fiz para desenvolver uma tela como essa. Não vou explicar cada coisa, senão ficaria um
posto muito longo.

```html

<html>
<head>
    <meta charset="UTF-8">
    <title>Comece do Zero!</title>

    <style type="text/css">
        body {
            background-color: beige;
            text-align: center;
            font-size: 20px;
        }

        p {
            margin-top: 50px;
        }

        a.mastercode {
            color: orangered;
        }

        button {
            color: white;
            border: none;
            padding: 10px;
            background: red;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>
<body>
<p>
    Assim se começa um parágrafo de texto. <br><br>
    Também podemos adicionar um <a class="mastercode" href="https://mastercode.dev">link</a> para você acessar a página
    inicial.
    <br><br>
    Ou use o botão abaixo para acabar logo com isso.
</p>
<button>Explodir a tela!</button>
</body>
</html>
```

Analise o código e escreva nos comentários se entendeu ou se ficou com alguma dúvida.

Usei apenas um editor de texto simples, como o bloco de notas e o navegador para fazer isso. Claro, conhecimento também.

### Só isso?

Não. Obviamente que, quanto mais complexa for a tela que você precisa desenvolver, mais trabalho terá.

Mas entenda, estamos falando de uma jornada e você está começando do zero. Se cada dia aprender a fazer algo novo, não
vai demorar muito até que consiga desenvolver o primeiro site sozinho.

Quanto mais você aprende, maior será a sua capacidade de aprender mais. Com o tempo, isso se torna algo comum na sua
rotina.

### Considerações finais

O mercado de _front-end_ é um dos maiores do mundo. É possível começar do básico, como demonstrado aqui, até o
desenvolvimento de sistemas e aplicativos muito elaborados.

Considero a porta de entrada perfeita. Uma parte da programação muito mais intuitiva e visual. Facilita muito o
aprendizado.

É uma questão de tempo apenas para entrar em atividades mais complexas.

Nos vemos em breve!
