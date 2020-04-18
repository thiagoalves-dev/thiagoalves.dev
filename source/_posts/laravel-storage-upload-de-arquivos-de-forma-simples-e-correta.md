---
extends: _layouts.post
section: content
featured: true

date: 2020-04-18
author: Thiago Alves
date_txt: 18 de Abril de 2020
title: "Laravel Storage: upload de arquivos de forma simples e correta"
description: Exemplificando como fazer upload de arquivos usando a Storage do Laravel e a diferença de arquivos públicos e privados.
keywords: Storage, Upload, Arquivos
---

Em qualquer sistema é muito comum que haja alguma manipulação de arquivos. Desde fotos para um site até relatórios confidenciais em PDF.
 
A forma como o Laravel trabalha essa questão é incrivelmente simples. Basicamente, se você usar a estrutura que o _framework_ disponibiliza, dificilmente terá problemas com isso.

Criei um projeto para usarmos como exemplo. Segue o _link_ do repositório: [thiagomcw/laravel-storage-example](https://github.com/thiagomcw/laravel-storage-example).

Fiz um HTML bem simples para simular um formulário onde será feito o _upload_ de uma foto de perfil de usuário.

```html
<!-- home.blade.php -->

<form action="/store" method="post" enctype="multipart/form-data">
    @csrf
    <input name="profile_image" type="file">
    <button type="submit">Submit</button>
</form>
```

#### Salvando o arquivo como privado

Neste caso a imagem só ficará acessível implementando uma funcionalidade que permita isso. Seja de exibição ou _download_.

```php
// HomeController

public function store(Request $request)
{
    $request->file('profile_image')->store('/');
}
```

#### Salvando o arquivo como público

Neste caso a imagem ficará acessível a qualquer um, basta saber como acessá-la.

```php
// HomeController

public function store(Request $request)
{
    $request->file('profile_image')->store('/', 'public');
}
```

O Laravel já vem com a pasta `storage/app/public` configurada.

```php
// config/filesystems.php

'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
]
``` 

É preciso criar um _symlink_ dentro do diretório público do Laravel para tornar seus arquivos públicos acessíveis pela URL do navegador.
 
Use o seguinte comando: `php artisan storage:link`.

<img src="/assets/images/post-laravel-storage/storage-on-public-folder.png" alt="Resultado do comando anterior.">

Resultado final:

<img src="/assets/images/post-laravel-storage/image-public-access.png" alt="Visualização de uma imagem pública pelo navegador.">

Nos vemos em breve!