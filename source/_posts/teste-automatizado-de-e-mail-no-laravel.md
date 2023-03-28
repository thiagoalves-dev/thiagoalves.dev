---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-06-26
author: Thiago Alves
title: Teste automatizado de e-mail no Laravel
description: "Dias atrás, deparei-me com uma questão que quebrei a cabeça para testar. Eu precisava enviar um e-mail
para um cliente e queria validar se a montagem dele acontecia da forma correta."
keywords: Testes, Tests, Mailable, Email, View, Markdown
---

Confesso que ultimamente, ando bastante interessado em aprofundar-me sobre testes automatizados. No meu dia a dia, a
preocupação com a cobertura de testes é cada vez maior.

Dias atrás, deparei-me com uma questão que quebrei a cabeça para testar. Eu precisava enviar um e-mail para um cliente e
queria validar se a montagem dele acontecia da forma correta.

Na documentação do _Laravel_, encontrei uma opção chamada de [Mail Fake](https://laravel.com/docs/mocking#mail-fake),
mas confesso que não satisfez a minha necessidade. Durante as minhas tentativas, fiz alterações no código que deveriam
ter causado a "quebra" do teste, mas isso não aconteceu. Sendo assim, desisti de usá-lo.

Depois de conversar com um amigo, surgiu uma ideia interessante que me possibilitaria testar a classe `Mailable` e
a `view`, de uma forma bastante simples.

Abaixo, vou usar uma implementação fictícia para exemplificar o que fiz.

### O cenário

Preciso enviar um e-mail para um cliente contendo o resumo do pedido de compra que ele fez no meu site.

Para isso, implementei uma classe `Mailable` que recebe o `ID` do pedido que enviarei na mensagem. No meu sistema, os
pedidos são representados classe pela `Order`, que possui uma ligação direta com a classe `User`, representando o
cliente que fez o pedido.

A `view` do e-mail foi desenvolvida com [Markdown](https://en.wikipedia.org/wiki/Markdown), mas o mesmo poderia ser
feito com HTML.

Seguem abaixo, o código - ligeiramente resumido - do cenário descrito:

```php
// app/User.php

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}
```

```php
// app/Order.php

class Order extends Model
{
    protected $fillable = [
        'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

```php
// app/Mail/OrderSummary.php

class OrderSummary extends Mailable
{
    private $orderId;

    public $order;

    public function __construct($orderId)
    {
        $this->orderId = $orderId;
    }

    public function build()
    {
        return $this
            ->loadOrder()
            ->to($this->order->user->email, $this->order->user->name)
            ->markdown('emails.order-summary');
    }

    private function loadOrder()
    {
        $this->order = Order::find($this->orderId);

        return $this;
    }
}
```

```blade
// resources/views/emails/order-summary.blade.php

@component('mail::message')

# Olá, {{ $order->user->name }}

Seu pedido, no valor de R$ {{ $order->total_price }}, foi confirmado!

@component('mail::button', ['url' => 'thiagoalves.dev/pedido/' . $order->id])
    Ver pedido
@endcomponent

@endcomponent
```

### O teste

Como mencionado na introdução, o meu objetivo é testar a classe `Mailable` e a montagem da `view`, para me certificar de
que não existem erros nessa lógica, devido às mudanças que acontecerão no código ao longo do tempo.

Para isso, o primeiro passo é gerar dados falsos para usar no teste. Fiz isso usando as famosas `factories`.

```php
// database/factories/UserFactory.php

$factory->define(User::class, function (Faker $faker) {
    return [
        'name'     => $faker->name,
        'email'    => $faker->unique()->safeEmail,
        'password' => bcrypt('12345'),
    ];
});
```

```php
// database/factories/OrderFactory.php

$factory->define(Order::class, function (Faker $faker) {
    return [
        'total_price' => $faker->numberBetween(100, 200),
        'user_id'     => function () {
            return factory(User::class)->create()->getKey();
        },
    ];
});
```

Para validar o que quero, vou usar dois testes apenas. Um que testará o método build do `Mailable` e outro que valida a
renderização do corpo do e-mail. Segue abaixo.

```php
// tests/Feature/Mail/OrderSummaryTest.php

class OrderSummaryTest extends TestCase
{
    private $mail;

    protected function setUp(): void
    {
        parent::setUp();

        $order = factory(Order::class)->create();

        $this->mail = new OrderSummary($order->getKey());
    }

    public function testBuildSuccess()
    {
        $this->assertInstanceOf(OrderSummary::class, $this->mail->build());
    }

    public function testRenderSuccess()
    {
        $this->assertIsString($this->mail->render());
    }
}
```

Simples, né? Apenas isso é o suficiente para verificar se toda a lógica de montagem do e-mail acontece corretamente.
Ambos validam o retorno de métodos que devem falhar se algo de errado acontecer.

Veja o resultado:

<img src="/assets/images/post-laravel-mailable-tests/success.png" alt="Teste bem sucedido" />

Agora se eu remover o relacionamento do pedido com o usuário, por exemplo, as duas verificações devem quebrar.

```php
// app/Order.php 

class Order extends Model
{
    protected $fillable = [
        'total_price',
    ];
}
```

Resultado:

<img src="/assets/images/post-laravel-mailable-tests/fail.png" alt="Teste com falha" />

Este teste não inclui validar o envio do e-mail, uma vez que isso geralmente depende de um servidor externo. O foco é
realmente testar a sua montagem, não uma integração com o `SMTP`.

### Concluindo

Envio de e-mails tende a ser uma das partes mais obscuras de um sistema e também uma das mais chatas de se testar.

Já perdi a conta de quantas vezes fiz modificações num código, afetando o envio de um e-mail que, muitas vezes, nem
tinha relação direta com o que foi alterado.

O código acima está disponível no
meu [repositório do github](https://github.com/thiagoalves-dev/laravel-storage-example) para
que possa copiar. Espero que ajude.

Nos vemos em breve!
