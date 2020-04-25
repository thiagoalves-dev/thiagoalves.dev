---
extends: _layouts.post
section: content
featured: true

date: 2020-04-26
author: Thiago Alves
date_txt: 26 de Abril de 2020
title: "Clean Code: princípio da responsabilidade única do SOLID"
description: A base para o Clean Code é o SOLID. Então vou exemplificar o que a primeira letra do acrônimo ensina.
keywords: Clean Code, Código Limpo, SOLID, Classe
---

Se tem uma coisa que estudei nos últimos anos e que mudou a minha vida como desenvolvedor, foi o tal do _Clean Code_.

Poucas coisas costumam dar tanto medo num desenvolvedor do que fazer manutenção num código escrito há um ano, por exemplo. Porém, aplicando os conceitos de _Clean Code_, isso tende a melhorar bastante.

Eu não quero dizer que você não vai ler o seu código antigo e achá-lo "menos sofisticado" em relação aos que escreve atualmente. Afinal estamos em constante evolução. 

Só que uma coisa é evoluir e outra bem diferente é não entender o código que você mesmo escreveu, não é mesmo?

Pensando nisso, começo uma longa série de posts aqui no blog abordando esse assunto.

### O que é clean code?

Em português, código limpo, nada mais é do que uma filosofia de programação que tem como finalidade facilitar a escrita e a leitura de código, tornando simples o entendimento da sua função.

### O que é SOLID?

**S** - _Single responsibility principle_: Princípio da Responsabilidade Única. <br>
**O** - _Open/closed principle_: Princípio do Aberto/Fechado. <br>
**L** - _Liskov substitution principle_: Princípio da substituição de Liskov. <br>
**I** - _Interface segregation principle_: Princípio da segregação de interfaces. <br>
**D** - _Dependency inversion principle_: Princípio da inversão de dependência. 

São cinco princípios da programação orientada a objetos que servem de base para vários padrões e conceitos de desenvolvimento, incluindo o _Clean Code_.

Introdução feita. Vamos ao assunto que intitula este post:

### Princípio da Responsabilidade Única

Na minha opinião, o que a primeira letra do acrônimo SOLID nos ensina é o princípio mais importante da programação. Sem a sua aplicação, não existe código limpo.

**Uma classe deve ter apenas uma responsabilidade, uma razão de existir, resolver um problema e, não menos importante, um motivo para ser alterada.**

Imagine que temos um sistema que calcula o preço do produto com base no seu peso em quilos. 

Então, vamos criar um único código para resolver essa questão e ver como fica.

```php
class Produto {
    public $nome;

    public $precoPorKg;

    public function calculaPrecoProduto(float $quilos) {
        return $this->precoPorKg * $quilos;
    }
}
```

Note que, na mesma classe, temos as informações do produto e conseguimos obter o seu preço final.

À primeira vista, está tudo certo, já que se tratam de poucas linhas de código. 

**O problema começa quando o sistema cresce.** Agora, imagine que ele possui também: gerenciamento de estoque e de entrega, emissão de notas, leitura de código de barras e por aí vai.

Imagine também precisamos calcular o valor do frete considerando a distância em quilômetros. Tranquilo, né!? 

```php
class Frete {
    public $endereco;

    public $precoPorKm;

    public function calculaPrecoFrete(float $quilometros) {
        return $this->precoPorKm * $quilometros;
    }
}
```

Percebe que fizemos a mesma coisa, só que em lugares e com nomes diferentes?

Como eu faria esse código aplicando o princípio da responsabilidade única:

```php
class Produto {
    public $nome;

    public $precoPorKg;
}

class Frete {
    public $endereco;

    public $precoPorKm;
}

class Calculadora {
    public function multiplica(float $multiplicando, float $multiplicador) {
        return $multiplicando * $multiplicador;
    }
}
```

Pronto! Agora temos três classes totalmente independentes onde uma delas é reaproveitável.

Esse tema será muito abordado aqui no blog. Estamos só começando.

Nos vemos em breve!