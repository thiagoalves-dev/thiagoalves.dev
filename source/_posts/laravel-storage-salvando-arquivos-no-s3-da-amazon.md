---
extends: _layouts.post
section: content
published: true
featured: true

date: 2020-04-25
author: Thiago Alves
date_txt: 25 de Abril de 2020
title: "Laravel Storage: salvando arquivos no S3 da Amazon"
description: Exemplo de como salvar arquivos no s3 da Amazon usando a classe Storage do Laravel.
keywords: Storage, Upload, Arquivos, S3, Amazon, AWS
---

Dias atrás demonstrei de forma simples como fazer [upload de arquivos usando a classe Storage do Laravel](/blog/laravel-storage-upload-de-arquivos-de-forma-simples-e-correta).

Vou aproveitar o código já feito para mostrar como salvar os arquivos no AWS S3, serviço de armazenamento da Amazon.

Segue o _link_ do repositório: [thiagomcw/laravel-storage-example](https://github.com/thiagomcw/laravel-storage-example).

Partindo do pressuposto que já tenha uma conta na AWS criada, vamos ao passo a passo:

**Bucket**

Em `Services > Storage > S3`, crie um novo bucket para armazenar os arquivos da sua aplicação.

**Chaves de Acesso**

No menu do seu usuário na AWS, vá em _My Security Credentials_. Crie uma nova _Access Key_ e copie as chaves que forem geradas.

**Configuração**

O Laravel já trás por padrão as variáveis de configuração do S3, basta adicionar os dados da sua conta e _bucket_. 

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

Não há necessidade de configuração ou codificação nesse sentido, apenas execute o seguinte comando no terminal: `composer require league/flysystem-aws-s3-v3`.

Tudo pronto! Agora vamos ao código.

**Upload**

Adicionei uma nova rota para o método que usarei o S3. 

```php
// routes/web.php

Route::post('/storeS3', 'HomeController@storeS3')->name('home.storeS3');
```

O segundo parâmetro do método `store` é o disco em que iremos salvar o arquivo. Nele passamos o "s3" e o Laravel faz o resto sozinho.

```php
// HomeController

public function storeS3(Request $request)
{
    $request->file('profile_image')->store('/', 's3');
}
```

Na visualização do _Bucket_ acesso o arquivo que fiz upload.

<img src="/assets/images/post-laravel-storage-s3/s3-print.png" alt="AWS S3 Bucket"/>

**Visualização**

Existem várias formas de ter acesso aos arquivos no S3: através de _download_, endereços temporários, etc. Isso também vai variar de acordo com as permissões de acesso configuradas no _bucket_.

Abaixo, exemplifiquei uma rota onde passo o nome do arquivo que quero acessar e, no _controller_, redireciono para um endereço temporário ou é possível ver a imagem que cadastrei.

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

Resultado final:

<img src="/assets/images/post-laravel-storage-s3/image-show-print.png" alt="Visualização da imagem"/>

Nos vemos em breve!