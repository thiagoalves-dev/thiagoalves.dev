---
extends: _layouts.post
section: content
featured: true

date: 2020-04-20
author: Vanderlei Sbaraini Amancio
date_txt: 20 de Abril de 2020
title: "Custom Casts do Laravel: convertendo atributos de um Model"
description: Falando um pouco sobre a nossa empresa, sobre a criação do blog e o que esperar dele.
keywords: Blog
---

O Laravel nos fornece diversos tipos para cast em um modelo do Eloquent, Porém torna-se frequente, especialmente conforme o projeto cresce, a necessidade de transformar outros tipos. Até a versão 6.* estavamos limitados aos tipos oferecidos pelo framework ou teriamos que utilizar Mutators e Accessors.

Tenhamos como exemplo um modelo _Booking_ contendo informações de pagamento:

```php
// O objeto para o qual queremos converter

class BillingInfo
{
    private string $email;
    private string $name;
    private string $cardLastFour;
    private string $cardBrand;

    public function __construct(string $email, string $name, string $cardLastFour, string $cardBrand)
    {
        $this->email = $email;
        $this->name = $name;
        $this->cardLastFour = $cardLastFour;
        $this->cardBrand = $cardBrand;
    }

    // Getters and Setters ...

    public function toJson(): string
    {
        return json_encode([
            'email'          => $this->email,
            'name'           => $this->name,
            'card_last_four' => $this->cardLastFour,
            'card_brand'     => $this->cardBrand,
        ]);
    }
}
```

```php
// Nosso modelo

class Booking extends Model
{
    protected $fillable = [
        'billing_info',
    ];

    public function getBillingInfoAttribute(): BillingInfo
    {
        // billing_info
        $data = json_decode($this->attributes['billing_info'], true);

        return new BillingInfo([
            'email'          => $data['email'],
            'name'           => $data['name'],
            'card_last_four' => $data['card_last_four'],
            'card_brand'     => $data['card_brand'],
        ]);
    }

    public function setBillingInfoAttribute(BillingInfo $billingInfo): void
    {
        $this->attributes['billing_info'] = $billingInfo->toJson();
    }
}
```

Não tem nada de errado em utilizar este método, mas imagine um Model que tenha diversas dessas conversões ou que esse casting seja necessário em mais modelos. Sim, poderiamos adicionar uma Trait e importá-la onde fosse necessário, mas também temos limitações nesse método.

Outro fator a se considerar é que se sua aplicação está crescendo, logo você precisará organizar seu projeto além do que o Laravel propõe (mesclando com DDD, por exemplo). Lembre-se: quanto mais explícito seu código, melhor compreensível ele será.


### Bem vindos, Custom Casts!

A partir da versão 7, o Laravel nos permite utilizar [Custom Casts](https://laravel.com/docs/7.x/eloquent-mutators#custom-casts). Nossa classe de casting precisa implementar a interface `Illuminate\Contracts\Database\Eloquent\CastsAttributes`. Vejamos nosso modelo:

```php
namespace App\Models;

class Booking extends Model
{
    protected $fillable = [
        'billing_info',
    ];
    
    protected $casts = [
        'billing_info' => BillingInfoCast::class,
    ];
}

```

E a classe responsável pela transformação dos dados:

```php
namespace App\Casts;

class BillingInfoCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        $data = json_decode($value, true);
        
        return new BillingInfo(
            'email'          => $data['email'],
            'name'           => $data['name'],
            'card_last_four' => $data['card_last_four'],
            'card_brand'     => $data['card_brand']
        ];
    }
    
    public function set($model, string $key, $value, array $attributes)
    {
    	\Webmozart\Assert\Assert::isInstanceOf($value, BillingInfo::class, 'Value must be an instance of BillingInfo');
    
        return $value->toJson();
    }
}
```

Você pode estar se perguntando porque não apenas utilizar o cast `object`, `array` ou `collection`, já presentes no Laravel. Explico: você não terá controle sobre os atributos presentes do objeto salvo no banco de dados. Imagine o tempo que você perderia tentando encontrar um erro pois outro programador fez algo de errado em outra parte do código que afete esse atributo. Forçando o uso de um cast e de uma classe específica para o seu atributo, qualquer modificação dos atributos do objeto deverá ser alterado nessas classes. Muito mais fácil de encontrar qualquer eventual mudança, não é mesmo?

E agora temos uma melhor separação do código, além do benefício de podermos reutilizar a classe de cast em outros Models.

#### Dica Extra

Notou o `\Webmozart\Assert\Assert::isInstanceOf($value, BillingInfo::class, 'Value must be an instance of BillingInfo');` ?

Utilizo muito  o pacote [webmozart/assert](https://github.com/webmozart/assert) para verificar dados quando não é possível fazê-lo com o PHP de forma trivial. No nosso exemplo,  a interface `CastsAttributes` não nos permite definir o tipo para os parâmetros, especialmente `$value`. `Assert::isInstanceOf` vai verificar o tipo do valor recebido, e caso não seja o indicado, vai disparar uma excessão com a `string` indicada. Este pacote é especialmente útil para validar se todos os itens de um array são de um determinado tipo, principalmente porque o PHP ainda não nos permite definir tipos dentro de um array (exemplo: `User[]`).


E aí, o que achou?