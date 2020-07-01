---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-07-01
author: Thiago Alves
title: Testes automatizados para validações no Laravel
description: Seguindo o assunto abordado no último post, desta vez vou implementar outra variação de teste no Laravel. Validação de dados das requisições.
keywords: Testes, Tests, Request, Controller, Validações
---

Seguindo o assunto abordado no [último post](/blog/teste-automatizado-de-e-mail-no-laravel), desta vez vou implementar outra variação de teste no Laravel.

Dias atrás, um desenvolvedor que nos acompanha aqui no blog, entrou em contato comigo para tirar algumas dúvidas sobre testes de validação de dados, compartilhei com ele alguns exemplos que escrevi na hora e discutimos mais alguns detalhes sobre o tema. Então, decidi que seria uma boa ideia postar os exemplos aqui, para que mais pessoas possam ter acesso.

Na minha rotina de trabalho, o desenvolvimento de APIs é algo bastante comum. Logo, escrever testes para isso, também, e uma das lógicas que costumo testar são exatamente as validações dos dados recebidos nas requisições. 

Sem mais delongas, vamos ao que interessa!

### O cenário

O meu sistema possui um cadastro de usuários simples. Poderia ser qualquer site desses em que criamos uma conta, preenchendo alguns campos básicos, inicialmente.

Recebo os dados através de uma `Request`, inserindo-os no banco e retornando o objeto criado (simplificado para o exemplo). Segue abaixo:

```php
// app/Http/Controllers/UsersController.php

use App\Http\Requests\UserStoreRequest;
use App\User;

class UsersController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        return User::query()
            ->create($request->validated());
    }
}
```

No `FormRequest` eu valido as informações vindas do formulário:

```php
// app/Http/Requests/UserStoreRequest.php

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name'     => 'required|max:100',
            'email'    => 'required|email',
            'password' => 'required|confirmed',
        ];
    }
}
```

### O teste

O meu objetivo é testar se os dados são validados pela `Request` corretamente. Para isso, escrevi dois testes onde, no primeiro o foco são os campos obrigatórios e no segundo são as especificidades de cada campo.

Veja abaixo:

```php
// tests/Feature/Http/Controllers/UsersControllerTest.php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Support\Str;
use Tests\TestCase;

class UsersControllerTest extends TestCase
{
    public function testStoreRequiredValidation()
    {
        $this
            ->sendStoreRequest()
            ->assertStatus(422)
            ->assertJsonStructure([
                'errors' => [
                    'name',
                    'email',
                    'password',
                ],
            ]);
    }

    public function testStoreSpecificValidation()
    {
        $this
            ->sendStoreRequest([
                'name'                  => Str::random(120),
                'email'                 => Str::random(50),
                'password'              => '123456',
                'password_confirmation' => '12345',
            ])
            ->assertStatus(422)
            ->assertJsonStructure([
                'errors' => [
                    'name',
                    'email',
                    'password',
                ],
            ]);
    }

    private function sendStoreRequest(array $data = [])
    {
        return $this->postJson(route('users.store'), $data);
    }
}
```

Veja o resultado:

<img src="/assets/images/post-laravel-test-form-requests/two-tests.png">

### Incrementando

No cenário descrito, também podemos validar se o e-mail informado já está cadastrado no banco. Basta adicionar a regra `unique` à minha `Request`.

```php
// app/Http/Requests/UserStoreRequest.php

public function rules()
{
    return [
        'name'     => 'required|max:100',
        'email'    => 'required|email|unique:users',
        'password' => 'required|confirmed',
    ];
}
```

No teste, crio um usuário para garantir que haverá algum cadastrado e uso o seu e-mail na requisição para forçar o erro.

```php
// tests/Feature/Http/Controllers/UsersControllerTest.php

public function testStoreUniqueEmailValidation()
{
    $user = factory(User::class)->create();

    $this
        ->sendStoreRequest([
            'name'                  => Str::random(100),
            'email'                 => $user->email,
            'password'              => '123456',
            'password_confirmation' => '123456',
        ])
        ->assertStatus(422)
        ->assertJsonStructure([
            'errors' => [
                'email',
            ],
        ]);
}
```

Veja o resultado:

<img src="/assets/images/post-laravel-test-form-requests/three-tests.png">

Muitas regras podem ser implementadas nas validações de dados. Recomendo que, quando mais regras, mais testes sejam escritos, pois, acredito ser a melhor forma de explorar as possibilidades. 

### Concluindo

Para testes relacionados a comportamento de formulário, exibição de erros, recomendo o uso do _Laravel Dusk_. Inclusive, já fiz um [post aqui no blog sobre isso](/blog/testes-automatizados-de-navegacao-com-laravel-dusk).

Noto uma grande carência de conteúdo gratuito relacionado a testes, pelo menos em _PHP_. Ultimamente, muitas pessoas comentam comigo que não encontram nada muito prático e que se sentem perdidos, não sabendo por onde começar.

Gradualmente, trarei novos exemplos aqui para ajudar. Talvez possamos até fazer uma live, _codando_ testes e tirando dúvidas. O que acha?

Nos vemos em breve!