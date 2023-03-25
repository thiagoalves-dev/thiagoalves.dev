---
extends: _layouts.post
section: content
published: true

date: 2020-05-18
author: Thiago Alves
title: 'SOLID: Princípio da substituição de Liskov'
description: A base para o Clean Code é o SOLID. Então vou exemplificar o que a terceira letra do acrônimo ensina.
keywords: Clean Code, Código Limpo, SOLID, Liskov
---

Primeiramente, é importante dizer que este post é a continuação de outros dois: [princípio da responsabilidade única](/blog/clean-code-principio-da-responsabilidade-unica-do-solid) e [princípio do aberto/fechado](/blog/clean-code-principio-do-aberto-fechado-do-solid). É importante que você leia os anteriores para contextualizar este.

O princípio da substituição de Liskov, apesar de simples, pode parecer confuso à primeira vista. Criado por Barbara Liskov, ele diz que: “**Se q(x) é uma propriedade demonstrável dos objetos x de tipo T. Então q(y) deve ser verdadeiro para objetos y de tipo S onde S é um subtipo de T.**”

Cada vez que você ler essa definição, ela ficará mais clara, prometo.

Isso significa dizer que, quando temos uma classe e outras que derivam dela, ela pode ser substituída por uma derivada a qualquer momento, já que a classe derivada também é uma classe principal. 

### Na prática

No `PHP`, é possível reproduzir um exemplo usando interfaces ao invés de classes propriamente ditas.

No exemplo abaixo, vou criar uma lógica para adicionar dois produtos diferentes num mesmo carrinho de compras, escrevendo o código da forma mais direta e resumida possível para que não fique extenso.

Vou adicionar as explicações nos comentários para ficar mais didática a leitura. Vamos lá:

```php
// Classe principal
interface Produto {
    // Definição de método
    public function getTotal(float $quantidade):float;
}

// Classe derivada do Produto
class Chocolate implements Produto {
    public function getTotal(float $quantidade):float
    {
        return 2.5 * $quantidade;
    }
}

// Classe derivada do Produto
class Refrigerante implements Produto {
    public function getTotal(float $quantidade):float
    {
        return 4.2 * $quantidade * 1.02;
    }
}

// Classe do carrinho
class Carrinho {
    public $lista = array();

    // Note que o método espera receber objeto Produto
    public function adicionarProduto(Produto $produto, int $quantidade)
    {
        // Lógica criada apenas para ter um resultado final
        array_push($this->lista, [
            'nome'       => get_class($produto),
            'quantidade' => $quantidade,
            'preco'      => $produto->getTotal($quantidade)
        ]);
    }
}

$carrinho = new Carrinho;

// Note que eu envio os objetos derivados para o método do carrinho
$carrinho->adicionarProduto(new Chocolate, 4);
$carrinho->adicionarProduto(new Refrigerante, 2);

var_export($carrinho->lista);
```

No exemplo acima, a classe principal está ditando as regras para as outras. Toda a classe que herdar-la, deverá ser como ela.

Isso permite que eu mande os objetos derivados para o carrinho ao invés de um `Produto`.

Aqui está o núcleo do princípio de Liskov.

Resultado:
```php
array (
    0 =>
        array (
            'nome' => 'Chocolate',
            'quantidade' => 4,
            'preco' => 10.0,
        ),
    1 =>
        array (
            'nome' => 'Refrigerante',
            'quantidade' => 2,
            'preco' => 8.568,
        ),
)
```

### Finalizando

Conforme avançamos nos princípios do _SOLID_, fica muito claro como eles se completam. Se escrever um código mais limpo e legível é o que busca, os primeiros passos são esses.

Assim que eu finalizar essa sequência de posts e vamos entrar mais fundo no _Clean Code_ propriamente dito.

Nos vemos em breve!
