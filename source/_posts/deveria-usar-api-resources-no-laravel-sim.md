---
extends: _layouts.post
section: content

date: 2020-05-13
author: Thiago Alves
date_txt: 13 de Maio de 2020
title: "Deveria usar API Resources no Laravel? Sim!"
description: Se você trabalha com APIs na sua aplicação Laravel e ainda não usa API Resources, é bem provável que o seu código não esteja lá essas coisas.
keywords: Api, Resources, JSON
---

Dias atrás eu navegava pelo [reddit](reddit.com) quando me deparei com a seguinte pergunta de um usuário: "deveria usar _API Resources_?". Muitas respostas surgiram, com bons argumentos, o convencendo que sim. 

A minha opinião sobre o assunto é muito clara: se você trabalha com _APIs_ na sua aplicação _Laravel_ e ainda não usa _API Resources_, é bem provável que o seu código não esteja lá essas coisas. A não ser que os seus métodos manipulem pouquíssimos dados.

Como a própria documentação diz, esse recurso serve para que façamos uma camada de transformação entre os modelos e as respostas em _JSON_ a serem retornadas.

A primeira vista, pode parecer que não faz muita diferença, ainda mais se você precisar retornar os dados do jeito que eles já são, mas bastam alguns detalhes a mais para que esse recurso mostre o seu valor.

### Na prática

O nosso exercício de hoje consiste no seguinte: precisamos buscar um produto específico e os seus dados. Abaixo temos os modelos para representar o produto e a categoria, além da rota do nosso método de API.

```php
// app/Product.php

class Product extends Model
{
    protected $fillable = ['name', 'price'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
```

```php
// app/Category.php

class Category extends Model
{
    protected $fillable = ['name'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```

```php
// routes/web.php

Route::get('/products/{product}', 'ProductsController@show');
```

**No primeiro exemplo, vou implementar o método apenas devolvendo os dados do modelo, sem qualquer alteração:**

```php
// app/Http/Controllers/ProductsController.php

class ProductsController extends Controller
{
    public function show(Product $product)
    {
        return $product;
    }
}
```

Resposta:
```json
{
    "id": 2,
    "category_id": 1,
    "name": "Suco",
    "price": 4.54,
    "created_at": "2020-05-11T20:22:30.000000Z",
    "updated_at": "2020-05-11T20:22:49.000000Z"
}
```

Mesmo não concordando muito com a ideia, num caso como esse, de fato não há uma necessidade de usar _API Resource_. 

Ao elevarmos um pouco o nível de exigência, é possível perceber que o nosso método vai precisar de melhorias. Imagine que junto ao produto, precisamos retornar os dados da categoria do mesmo. 

**Vamos lá:**

```php
// app/Http/Controllers/ProductsController.php

class ProductsController extends Controller
{
    public function show(Product $product)
    {
        return $product->load('category');
    }
}
```

Resposta:
```json
{
    "id": 2,
    "category_id": 1,
    "name": "Suco",
    "price": 4.54,
    "created_at": "2020-05-11T20:22:30.000000Z",
    "updated_at": "2020-05-11T20:22:49.000000Z",
    "category": {
    "id": 1,
        "name": "Bebidas",
        "created_at": "2020-05-11T20:22:16.000000Z",
        "updated_at": "2020-05-11T20:22:57.000000Z"
    }
}
```

É, confesso que ficou até melhor do que eu imaginava (risos), mas ainda está bem básico.

### Vamos ao que interessa

É hora de ser mais exigente com o nosso método. Agora, o produto precisa ter uma opção de preço já formatada em reais, as datas precisam vir no formato de leitura do Brasil e a categoria deve ser opcional.

**É hora de colocar o _API Resource_ para trabalhar a nosso favor:**

```php
// app/Http/Controllers/ProductsController.php

public function show(Product $product)
{
    return new \App\Http\Resources\Product($product);
}
```

```php
// app/Http/Resources/Product.php

class Product extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'         => $this->getKey(),
            'name'       => $this->name,
            'price'      => $this->price,
            'price_show' => number_format($this->price, 2, ',', '.'),
            'create_at'  => $this->created_at->format('d/m/Y H:i:s'),
            'category'   => $this->when($request->get('include_category'), function () {
                return new \App\Http\Resources\Category($this->category);
            }),
        ];
    }
}
```

```php
// app/Http/Resources/Category.php

class Category extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'   => $this->getKey(),
            'name' => $this->name,
        ];
    }
}
```

URL: `localhost:8000/products/2?include_category=1`.

Resposta:
```json
{
   "data": {
      "id": 2,
      "name": "Suco",
      "price": 4.54,
      "price_show": "4,54",
      "create_at": "11/05/2020 20:22:30",
      "category": {
         "id": 1,
         "name": "Bebidas"
      }
   }
}
```

Simples, né!?  

Agora temos um retorno mais completo e que podemos modificar de acordo com a demanda do sistema no momento. 

Para mim, o maior benefício está em não ter que manipular os dados dentro do controller e ainda poder acrescentar outras informações sempre que eu precisar. Por exemplo, além da categoria, eu poderia retornar o usuário que cadastrou o produto no sistema.

### Outro exemplo

Buscar uma categoria, listando todos os seus produtos: 

```php
// routes/web.php

Route::get('/categories/{category}', 'CategoriesController@show');
```

```php
// app/Http/Controllers/CategoriesController.php

class CategoriesController extends Controller
{
    public function show(Category $category)
    {
        return new \App\Http\Resources\Category($category);
    }
}
```

```php 
// app/Http/Resources/Category.php

class Category extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'       => $this->getKey(),
            'name'     => $this->name,
            'products' => $this->when($request->get('include_products'), function () {
                return \App\Http\Resources\Product::collection($this->products);
            }),
        ];
    }
}
```

URL: `localhost:8000/categories/2?include_products=1`.

Resposta:
```json
{
   "data": {
      "id": 2,
      "name": "Congelados",
      "products": [
         {
            "id": 3,
            "name": "Pizza",
            "price": 10.9,
            "price_show": "10,90",
            "create_at": "11/05/2020 20:22:32"
         },
         {
            "id": 4,
            "name": "Batata",
            "price": 7.49,
            "price_show": "7,49",
            "create_at": "11/05/2020 20:22:35"
         }
      ]
   }
}
```

Enfim, mesmo que eu use um exemplo bastante simples como esse, possibilidades realmente não faltam. 

### Finalizando

Uso esse recurso há pelo menos dois anos ininterruptos e nunca mais parei. Por mais simples que seja o método de _API_ que eu precise implementar, acabo sempre por usar _Resources_.

É importante deixar claro que no código acima, é possível fazer uma série de otimizações, mas optei por tentar ser mais didático.

Todo so códigos dos exemplos estão no meu [repositório no github](https://github.com/thiagomcw/laravel-storage-example), caso queira usá-lo nos seus testes.

Nos vemos em breve!