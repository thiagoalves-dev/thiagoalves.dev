---
date: '2020-05-20'
title: 'Algumas novidades do PHP 8'
description: 'Ao contrário do que muitos "especialistas" pregavam, o PHP mostra que tem um grande futuro pela frente. Com uma comunidade bastante numerosa, frameworks robustos e constantes melhorias, a linguagem está mais viva do que nunca.'
keywords: 'PHP 8, JIT, Exception, str_contains, Union Types, Throw, Traits'
---

Ao contrário do que muitos "especialistas" pregavam, o _PHP_ mostra que tem um grande futuro pela frente. Com uma
comunidade bastante numerosa, frameworks robustos e constantes melhorias, a linguagem está mais viva do que nunca.

Na versão 7.4, foi possível identificar algumas mudanças significativas acontecendo. Na versão 8 não deve ser diferente.

Vou listar abaixo algumas novidades que estão por vir e que despertaram a minha atenção.

### O compilador JIT (just in time)

Se você já programa em PHP, deve saber que se trata de uma linguagem interpretada durante a sua execução e não
compilada, como Java e C#.

O _JIT_ é uma técnica de compilar partes do código em tempo de execução. Basicamente, é como se o código fosse
monitorado para identificar trechos que são mais executados. Esses trechos são compilados para serem reutilizados nas
próximas execuções.

Espera-se um ganho de performance considerável com esse recurso. Farei um post mais específico e detalhado no futuro.

### Captura de exceção sem variável

Atualmente, para capturar uma exceção, é necessário armazená-la numa variável, mesmo que inutilmente. Isso não será mais
preciso.

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

### Função `str_contains`

No _Laravel Framework_, esta função já existe há algum tempo. No _PHP_ era possível obter um resultado semelhante usando
a função `strpos`, de uma forma menos elegante, digamos assim.

```php
// ANTES
$contains = strpos('Lá vem o Marco...', 'Marco') !== false;
// true

// DEPOIS
$contains = str_contains('...descendo o morro da vó Salvelina.', 'Salvelina');
// true
```

Na mesma linha, foram adicionadas as funções `str_starts_with` e `str_ends_with`.

```php
$starts = str_starts_with('caneta azul', 'caneta');
// true

$ends = str_ends_with('azul caneta', 'caneta');
// true
```

### Union types

Não encontrei uma forma satisfatória e curta de tradução, mas basicamente, significa permitir mais de uma opção de
tipagem para propriedades, parâmetros ou retornos.

```php
private string|Datetime $today;

public function test(int|float $value): int|float {
    return $value * 2;
}
```

### Expressão throw

O `throw` sempre foi considerado uma declaração de instrução no _PHP_. Agora ele será tratado como uma expressão,
aumentando as suas possibilidades de uso.

```php
$test = $item->prop ?? throw new PropriedadeNaoExiste('prop');

$test = $item ? $item->prop : throw new ObjetoNulo('item');
``` 

### Permitido usar `::class` em objetos

Atualmente, para obter o nome da classe de uma instância, é preciso usar a função `get_class`. No _PHP_ 8 será permitido
usar o `::class`, como é possível fazer nas classes, propriamente ditas (`MinhaClasse::class`).

```php
$test = new MinhaClasse();

// ANTES
echo get_class($test); // MinhaClasse

// DEPOIS
echo $test::class; // MinhaClasse
```

### Métodos abstratos em Traits

Possibilidade de criar métodos abstratos numa `trait` e não mais em classes, apenas. O _PHP_ fará a validação da
assinatura do método conforme as características que implementar.

```php
trait MinhaTrait {
    abstract public function test(int $value): int;
}

class MinhaClasse {
    use MinhaTrait;
    
    public function test(int $value): int
    {
        return $value;    
    }
}
```

### Finalizando

Várias outras novidades já circulam por aí. Destaquei algumas que devem afetar diretamente o meu dia a dia.

É muito importante falar sobre [Attributes](https://wiki.php.net/rfc/attributes_v2)
e [Weak Maps](https://wiki.php.net/rfc/weak_maps), mas entendo que se tratam de assuntos mais complexos e que merecem um
post próprio.

Nos vemos em breve!
