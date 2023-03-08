---
extends: _layouts.post
section: content
published: true

date: 2020-05-31
author: Thiago Alves
title: Testes automatizados de navegação com Laravel Dusk
description: "Por mais iniciante que você possa ser, é bem provável que, em algum momento, tenha ouvido falar no tal de
teste automatizado, da sua importância no desenvolvimento de sistemas e tudo mais."
keywords: Testes, Navegação, Dusk
---

Por mais iniciante que você possa ser, é bem provável que, em algum momento, tenha ouvido falar no _tal_ de teste
automatizado, da sua importância no desenvolvimento de sistemas e tudo mais.

De fato, conforme elevamos o nível de complexidade dos nossos projetos, é possível notar o quanto esse recurso nos ajuda
na construção e manutenção das funcionalidades.

Infelizmente, muitos profissionais, inclusive eu, só notam isso quando começam a enfrentar problemas que poderiam ser
evitados se os testes tivessem sido escritos. Um exemplo, é a boa e velha alteração que provoca uma quebra em outra área
do sistema.

### Variações de testes

Esse é um campo bastante amplo, atualmente. Existem formas de testar praticamente todas as áreas de uma aplicação. Desde
aquela pequena função que formata um CPF, por exemplo, até uma integração complexa e cheia de etapas com outro sistema
de um terceiro.

Testes unitários, funcionais, de integração, performance, segurança. A lista é realmente extensa, ao ponto de algumas
empresas contarem com profissionais especializados em desenvolver esses testes, conhecidos como _QA_ (_Quality
Analyst_).

### Laravel Dusk

Se trata de um pacote do Laravel para fazer testes simulando o comportamento do navegador, preenchendo formulários,
clicando em botões e _links_, validando se uma determinada informação aparece na tela e muito mais.

Como a maioria das soluções que o _framework_ oferece, o pacote é muito simples de instalar e usar. O processo de
configuração praticamente não existe, basta executar os comandos da documentação. Ele também não possui dependências
como [JDK](https://www.google.com/search?q=JDK) e [Selenium](https://www.selenium.dev).

#### Instalação

Use o `composer` para incluir o pacote nas dependências do seu projeto:

```shell
$ composer require --dev laravel/dusk
```

Posteriormente, execute o comando que vai criar toda a estrutura dos testes dentro de uma pasta `Browser`, no diretório
de `tests` do projeto.

```shell
$ php artisan dusk:install
```

<img src="/assets/images/post-laravel-dusk/tests-directory.png" alt="Diretório de testes do projeto" />

Tudo pronto!

P.S.: Confirme os comandos de instalação na [documentação oficial](https://laravel.com/docs/dusk), uma vez que eles
podem sofrer alteração.

P.S. 2: Antes de partirmos para a prática, verifique se a variável `APP_URL` no seu `.env` está com a _URL_ completa da
aplicação, senão, corrija.

### Na prática

#### O contexto

Implementei uma tela de cadastro bem básica, onde é preciso preencher apenas nome e email. Ao clicar em "Salvar",
redireciono para uma segunda tela onde listo todos os cadastros feitos. Prints abaixo.

<img src="/assets/images/post-laravel-dusk/form.png" alt="Formulário para adicionar registro" />

<img src="/assets/images/post-laravel-dusk/list.png" alt="Lista de registros cadastrados" />

### Teste 1

Preciso criar um teste automatizado para garantir que esse comportamento acontece corretamente. Então criei o seguinte
teste para tal:

```
// tests/Browser/RegistersTest

public function testAddRegisterSuccess()
{
    // Gerador de dados falsos
    $faker = Factory::create('pt_BR');

    $this->browse(function (Browser $browser) use ($faker) {
        $name = $faker->name;
        $email = $faker->email;

        $browser->visit('/registers/create') // Acessa a rota que de cadastro
            ->type('name', $name) // Preenche nome
            ->type('email', $email) // Preenche email
            ->press('Salvar') // Clica em "Salvar"
            ->assertPathIs('/registers') // Testa se fui redirecionado para a rota da lista
            ->assertSee($name) // Testa se o nome preenchido está na lista
            ->assertSee($email); // Testa se o email preenchido está na lista
    });
}
```

#### Execução

Para rodar todos os testes implementados com o Dusk, basta executar o comando abaixo:

```shell
$ php artisan dusk
```

Para rodar um teste específico, execute o comando da seguinte forma:

```shell
$ php artisan dusk tests/Browser/RegistersTest.php
```

Resultado:

<img src="/assets/images/post-laravel-dusk/run-all.png" alt="Resulta do teste executado" />

### Teste 2

Agora, quero garantir de que a validação do formulário funciona corretamente.

<img src="/assets/images/post-laravel-dusk/form-validation.png" alt="Formulário para adicionar registro com mensagens de validação" />

Para isso, escrevi o seguinte teste:

```
// tests/Browser/RegistersTest

public function testAddRegisterValidation()
{
    $this->browse(function (Browser $browser) {
        $browser->visit('/registers/create') // Acessa a rota que de cadastro
            ->press('Salvar') // Clica em "Salvar" sem preencher nada
            ->assertPathIs('/registers/create') // Testa se continuo na mesma tela
            ->assertSee('The name field is required.') // Testa se o erro referente ao nome foi exibido
            ->assertSee('The email field is required.'); // Testa se o erro referente ao email foi exibido
    });
}
```

Resultado:

<img src="/assets/images/post-laravel-dusk/run-all-2.png" alt="Resulta dos testes executados" />

### Concluindo

As possibilidades são infinitas. Futuramente, farei um segundo _post_ explorando mais recursos.

A primeira vista, esse processo parece trabalhoso, mas, como tudo na programação, a prática vai tornar isso cada vez
mais fácil e rápido.

Conforme o tempo passa, você não se preocupa mais em ter que escrever testes, mas sim, quais vai escrever para garantir
que os mais variáveis comportamentos estão cobertos.

Todo o código acima está disponível no meu [repositório](https://github.com/thiagomcw/laravel-storage-example), caso
queira baixar e testar.

Nos vemos em breve!
