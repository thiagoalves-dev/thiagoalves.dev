---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-05-27
author: Thiago Alves
title: 3 dicas para evitar duplicação de código no Laravel
description: 'Uma das regras não oficiais da programação diz que: a quantidade de código escrito está diretamente ligada a quantidade de erros gerados.' 
keywords: Dry, Clean Code, Route, Resource, Repository, Duplicação
---

Uma das regras não oficiais da programação diz que: a quantidade de código escrito está diretamente ligada a quantidade de erros gerados.

Isso pode ser muito questionado, já que é possível argumentar que existe uma série de outras variáveis e, a principal delas, seria o programador. O que não é uma mentira, mas não é o foco da nossa conversa.

A reflexão sobre o assunto vem do princípio _DRY_, criado por  [Dave Thomas](https://en.wikipedia.org/wiki/Dave_Thomas_(programmer)) e [Andy Hunt](https://en.wikipedia.org/wiki/Andy_Hunt_(author)), que significa _Don’t Repeat Yourself_ (não se repita). Basicamente, significa que as fontes de conhecimento e lógica de um sistema devem ter uma única representação.

No Laravel, três técnicas nos ajudam muito na prevenção a esse código repetido. Veja abaixo:

### Route Binding

Normalmente, quando passamos um ID pelas rotas, é comum que usemos esse ID para consultar um objeto no banco que vamos manipular por algum motivo.

```php
// routes/web.php
Route::get('/products/{id}', 'ProductsController@show');

// Controllers/ProductsController
public function show($id)
{
    return App\Product::find($id);
}
```

O problema começa quando, no mesmo controller ou em outros, temos mais métodos usando o mesmo `find`. Vamos usar o `bind` para resolver isso.

```php
Route::get('/products/{product}', 'ProductsController@show');

public function show(App\Product $product)
{
    return $product;
}
```

### Route Resource

Na documentação, é possível encontrar esse recurso em [Resource Controllers](https://laravel.com/docs/controllers#resource-controllers). Um pouco confuso, na minha opinião. Apesar disso, se trata de uma função bem útil que o _framework_ disponibiliza. 

Costumo dizer que o primeiro passo para manter um _controller_ bem organizado é usar os métodos considerados que vem por padrão.

Vamos continuar no exemplo dos produto e imaginar que precisamos implementar todos os métodos de manutenção dos produtos. Veja abaixo duas formas diferentes de criar rotas para isso obtendo o mesmo resultado.

```php
//ANTES
Route::get('/products', 'ProductsController@index');
Route::get('/products/create', 'ProductsController@create');
Route::post('/products', 'ProductsController@store');
Route::get('/products/{product}', 'ProductsController@show');
Route::get('/products/{product}/edit', 'ProductsController@edit');
Route::put('/products/{product}', 'ProductsController@update');
Route::delete('/products/{product}', 'ProductsController@destroy');

// DEPOIS
Route::resource('products', 'ProductsController');
```

<img src="/assets/images/post-dont-repeat-yourself/route-list.png" alt="Lista de rotas geradas"/>

Note que as rotas já estão são geradas com o `binding`.

### Repository

Não adianta procurar na documentação do Laravel, não está lá. Essa é uma prática que muitos desenvolvedores da comunidade aplicam, inclusive eu.

Se trata de criar uma camada para manipular as consultas ao banco de dados usando a abstração do Eloquent. 

Imagine que no nosso sistema, precisamos implementar uma pesquisa por nome dos produtos ativos. Tanto no site como na área do administrador.

Fazendo isso nos controllers:

```php
// Site/ProductsController
public function index(Request $request)
{
    $products = App\Product::query()
        ->where('active', true)
        ->where('name', 'like', "%{$request->get('name')}%")
        ->get();

    return view('site.products.index', compact('products'));
}

// Admin/ProductsController
public function index(Request $request)
{
    $products = App\Product::query()
        ->where('active', true)
        ->where('name', 'like', "%{$request->get('name')}%")
        ->get();

    return view('admin.products.index', compact('products'));
}
```

Agora vamos usar um repositório para fazer isso de uma forma bem básica.

```php
// app/Repositories/ProductRepository
class ProductRepository
{
    public function searchActiveProducts(string $name)
    {
        return \App\Product::query()
            ->where('active', true)
            ->where('name', 'like', "%$name%")
            ->get();
    }
}

// Site/ProductsController
public function index(Request $request, ProductRepository $repository)
{
    $products = $repository->searchActiveProducts($request->get('name'));

    return view('site.products.index', compact('products'));
}

// Admin/ProductsController
public function index(Request $request, ProductRepository $repository)
{
    $products = $repository->searchActiveProducts($request->get('name'));

    return view('admin.products.index', compact('products'));
}
```

Nesses casos, o ideal é implementar uma API para fazer esse trabalho, mas isso implicaria em modificações no funcionamento do _front_, o que não é o nosso foco. O mais importante nesse exemplo, é a unificação na fonte da informação.

Também é possível trabalhar com repositórios de uma forma bem mais elaborada. Em breve vou compartilhar um modelo para isso.

### Finalizando

Faz parte do meu dia a dia de trabalho, fazer _review_ do código escrito por outras pessoas e, quando analiso um _pull request_, as coisas que mais me chamam a atenção são: a falta de padrão e duplicações.

Confesso que demorei um pouco para me preocupar com esse assunto, mas conforme me envolvia em projetos maiores e mais importantes, a cobrança chegou.

Nos vemos em breve!