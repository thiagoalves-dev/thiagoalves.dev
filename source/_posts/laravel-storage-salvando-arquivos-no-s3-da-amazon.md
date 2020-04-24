---
extends: _layouts.post
section: content
featured: true

date: 2020-04-24
author: Thiago Alves
date_txt: 24 de Abril de 2020
title: "Laravel Storage: salvando arquivos no S3 da Amazon"
description: Exemplificando como fazer upload de arquivos usando a Storage do Laravel e a diferença de arquivos públicos e privados.
keywords: Storage, Upload, Arquivos, S3, Amazon
---

Dias atrás demonstrei de forma simples como fazer [upload de arquivos usando a classe Storage do Laravel](/blog/laravel-storage-upload-de-arquivos-de-forma-simples-e-correta).

Vou aproveitar o código já feito para mostrar como salvar os arquivos no AWS S3, serviço de armazenamento da Amazon.

Partindo do pressuposto que já tenha uma conta na AWS criada, vamos ao passo a passo:

**Bucket**

Em `Services > Storage > S3`, crie um novo bucket para armazenar os arquivos da sua aplicação.

**Chaves de Acesso**

No menu do seu usuário na AWS, vá em _My Security Credentials_. Crie uma nova _Access Key_ e copie as chaves que forem geradas.

**Configuração**

O Laravel já trás por padrão as variáveis de configuração do S3, basta adicionar os dados da sua conta e bucket.

```dotenv
# .env

AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxxxx
AWS_DEFAULT_REGION=us-east-2 # exemplo
AWS_BUCKET=bucket-name
```

```php
// config/filesystems.php

's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'url' => env('AWS_URL'),
    'endpoint' => env('AWS_ENDPOINT'),
]
```

**S3 Package**

É preciso instalar um [pacote](https://github.com/thephpleague/flysystem-aws-s3-v3) para que a comunicação com o S3 funcione corretamente.

Comando: `composer require league/flysystem-aws-s3-v3`.

Pronto! Agora é só partir para o código.

**Upload**

```php
// routes/web.php

Route::post('/storeS3', 'HomeController@storeS3')->name('home.storeS3');
```

```php
// HomeController

public function storeS3(Request $request)
{
    $request->file('profile_image')->store('/', 's3');
}
```

<img src="/assets/images/post-laravel-storage-s3/s3-print.png" alt="AWS S3 Bucket"/>

**Visualização**

```php
// routes/web.php

Route::get('/show-s3/{filename}', 'HomeController@showS3')->name('home.showS3');
```

```php
// HomeController

public function showS3(string $filename)
{
    return redirect(
        Storage::disk('s3')
            ->temporaryUrl($filename, now()->addMinutes(5))
    );
}
```

<img src="/assets/images/post-laravel-storage-s3/image-show-print.png" alt="Visualização da imagem"/>