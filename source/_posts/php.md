---
extends: _layouts.post
section: content

date: 2020-05-20
author: Thiago Alves
date_txt: 20 de Maio de 2020
title: PHP
description: desc
keywords: key
---

Ao contrário do que muitos especialistas vinham pregando, o PHP vem mostrando que tem um grande futuro pela frente. Com uma comunidade bastante numerosa, frameworks robustos e constantes evoluções, a linguagem melhora a cada atualização.

Na versão 7.4 já presenciamos uma quantidade considerável de mudanças acontecendo e na versão 8 não deve ser diferente.

Vou listar abaixo algumas novidades que estão por vir e que despertaram a minha atenção.

### O compilador JIT (just in time)

Se você já programa em PHP, deve saber que se trata de uma linguagem interpretada durante sua execução e não compilada como Java ou C#.

"JIT" é uma técnica de compilar partes do código em tempo de execução. A grosso modo, é como se o código fosse monitorado para identificar trechos que são mais executados. Esses trechos são compilados para serem reutilizados nas próximas execuções.

Espera-se um ganho de performance considerável com esse recurso.

### Captura de exceção sem variável

Atualmente, para capturar uma exceção, é necessário armazená-la numa variável, mesmo que inutilmente. Não será mais preciso.

Veja:

```php
// ANTES
try {
    // code
} catch (Exception $exception) {
    Log::error("Deu erro aqui!");
}

// DEPOIS
try {
    // code
} catch (Exception) {
    Log::error("Deu erro aqui!");
}
```

### Função str_contains

No Laravel Framework, esta função já existem há algum tempo. No PHP era possível obter o mesmo resultado usando a função `strpos`, de uma forma menos elegante, digamos assim.

Veja:

```php
// ANTES
$contains = strpos('Lá vem o Marco...', 'Marco') !== false;
// true

// DEPOIS
$contains = str_contains('...descendo o morro da vo Salvelina.', 'Salvelina');
// true
```

### Union types

Não encontrei uma forma aceitável e curta de tradução, mas basicamente, significa disponibilizar mais de uma opção de tipagem de propriedade, parâmetro ou retorno.

Veja:

```php
private string|Datetime $today;

public function test(int|float $value): int|float {
    return $value * 2;
}
```

