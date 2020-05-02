---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-05-02
author: Thiago Alves
date_txt: 2 de Maio de 2020
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

Na minha opinião, o que a primeira letra do 
acrônimo SOLID nos ensina é o princípio mais importante da programação. Sem a sua aplicação, não existe código limpo.

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

À primeira vista, está tudo certo, né!? **Não!**

Essa classe está claramente infringindo o princípio da responsabilidade única.

Note que temos a representação do produto e um método para calcular o seu preço final. Ou seja, se eu precisasse adicionar uma nova propriedade ou mudar a regra de cálculo de preço, teria dois motivos diferentes para modificar a mesma classe.

Como seria correto fazer essa implementação:

```php
class Produto {
    public $nome;

    public $precoPorKg;
}

class CalculadoraDePreco {
    public function calculaPrecoPorQuilo(float $precoPorQuilo, float $quilos) {
        return $precoPorQuilo * $quilos;
    }
}
```

Pronto! Agora temos duas classes e com responsabilidades bem definidas.

### Ficou vago?

De fato, esse princípio não é tão simples de entender a primeira vista. Principalmente porque o resultado que ele gera é mais indireto. 

O principal benefício aqui é evitar a existência de classes muito grandes e com muita complexidade, simplificando a manutenção e o entendimento. 

Conforme avançamos na filosofia do _Clean Code_, ele faz cada vez mais sentido. 

Esse tema ainda será muito abordado aqui no blog. Estamos só começando.

Nos vemos em breve!