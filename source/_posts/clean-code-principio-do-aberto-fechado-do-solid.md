---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-05-06
author: Thiago Alves
date_txt: 6 de Maio de 2020
title: "Clean Code: princípio do aberto/fechado do SOLID"
description: A base para o Clean Code é o SOLID. Então vou exemplificar o que a segunda letra do acrônimo ensina.
keywords: Clean Code, Código Limpo, SOLID, Classe
---

Antes de mais nada, peço que leia o post em que falo sobre o [princípio da responsabilidade única](/blog/clean-code-principio-da-responsabilidade-unica-do-solid), para que entenda melhor o contexto deste.

Apesar da sua importância, esse princípio é bastante simples e direto no que fundamenta: **classes devem estar abertas para extensão, mas fechadas para modificação**.

Traduzindo: **sempre que precisar expandir o comportamento de um código, crie um novo ao invés de fazer isso no que já existe**.

### É, sei que tá confuso...

Como disse, é um fundamento simples. A melhor forma de entendê-lo é na prática mesmo. 

Vou usar o exemplo de cálculo de preço produto. Então, vamos lá:

```php
class Produto {
    public $precoPorQuantidade;

    public function __construct($precoPorQuantidade)
    {
        $this->precoPorQuantidade = $precoPorQuantidade;
    }

    public function getTotal(float $quantidade)
    {
        return (new CalculadoraProduto)->calculaTotal($this, $quantidade);
    }
}

class CalculadoraProduto {
    public function calculaTotal(Produto $produto, float $quantidade) {
        return $produto->precoPorQuantidade * $quantidade;
    }
}

$produto = new Produto(10);

echo $produto->getTotal(2); // 20
```

No código acima, temos uma classe para o produto com diferentes formas de representação e outra para calcular o preço total. 

Ok! Agora imagine o seguinte cenário: precisamos que, para produtos do tipo "bebida", seja adicionado um acréscimo de 1% sob o valor final.

Rapidamente podemos implementar isso sem usar nenhum recurso muito complexo: Vamos lá:

```php
class Produto {
    public $tipo;

    public $precoPorQuantidade;

    public function __construct($precoPorQuantidade, $tipo = null)
    {
        $this->precoPorQuantidade = $precoPorQuantidade;
        $this->tipo = $tipo;
    }

    public function getTotal(float $quantidade)
    {
        return (new CalculadoraProduto)->calculaTotal($this, $quantidade);
    }
}

class CalculadoraProduto {
    public function calculaTotal(Produto $produto, float $quantidade) {
        $preco = $produto->precoPorQuantidade * $quantidade;

        if($produto->tipo === 'bebida') {
            $preco = $preco * 1.01;
        }

        return $preco;
    }
}

$produto = new Produto(10);
$bebida = new Produto(10, 'bebida');

echo $produto->getTotal(3); // 30

echo $bebida->getTotal(3); // 30.2
```

Tudo certo, né!? **Não!**

Tanto no produto quanto na calculadora o princípio do **aberto para extensão e fechado para modificação** foi desrespeitado. 

Imagine um supermercado. Se para cada variação de produto for necessário criar uma regra de cálculo, teremos um método que mira o infinito.

Vamos voltar às nossas classes ao estágio inicial e implementar essas novas necessidades do jeito certo? Bora:

```php
interface Calculavel {
    public function getTotal(float $quantidade);
}

class Produto implements Calculavel {
    public $precoPorQuantidade;

    public function __construct($precoPorQuantidade)
    {
        $this->precoPorQuantidade = $precoPorQuantidade;
    }

    public function getTotal(float $quantidade)
    {
        return (new CalculadoraProduto)->calculaTotal($this, $quantidade);
    }
}

class Bebida extends Produto implements Calculavel{
    public function getTotal(float $quantidade)
    {
        return (new CalculadoraBebida)->calculaTotal($this, $quantidade);
    }
}

interface Calculadora {
    public function calculaTotal(Calculavel $produto, float $quantidade);
}

class CalculadoraProduto implements Calculadora {
    public function calculaTotal(Calculavel $produto, float $quantidade) {
        return $produto->precoPorQuantidade * $quantidade;
    }
}

class CalculadoraBebida extends CalculadoraProduto implements Calculadora {
    public function calculaTotal(Calculavel $bebida, float $quantidade) {
        return parent::calculaTotal($bebida, $quantidade) * 1.01;
    }
}

$produto = new Produto(10);
$bebida = new Bebida(10);

echo $produto->getTotal(3); // 30

echo $bebida->getTotal(3); // 30.3
```

A primeira vista, pode parecer mais complexo, principalmente porque o código aumentou. 

A questão principal é que agora temos as regras de forma individualizada. Agora é possível criar regras de preço para outros grupos de produtos sem alterar as que já existem. Somado a isso, ficou muito mais simples mudar as regras de cálculo já existentes.

### Finanlizando

Como tudo do desenvolvimento, a melhor forma de aprender esse princípio é na prática. 

Os códigos acima estão funcionais. Basta copiar, modificar, testar. Enfim, divirta-se.

Nos vemos em breve!