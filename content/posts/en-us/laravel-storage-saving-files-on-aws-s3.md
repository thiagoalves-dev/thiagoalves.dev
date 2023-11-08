---
date: '2020-04-25'
title: 'Laravel Storage: saving files on AWS S3'
description: "Example of how to save files to AWS S3 using Laravel's Storage class."
keywords: 'Storage, Upload, Files, S3, Amazon, AWS'
ptBrSlug: 'laravel-storage-salvando-arquivos-no-s3-da-amazon'
---

A few days ago I demonstrated in a simple way how
to [upload files using Laravel's Storage class](/blog/posts/laravel-storage-simple-correct-way-to-upload-files).

I am going to use the same code in order to show how to save files in AWS S3, Amazon's storage service.

Follow the repository
link: [thiagoalves-dev/laravel-storage-example](https://github.com/thiagoalves-dev/laravel-storage-example).

Assuming you have already created an AWS account, let's follow the steps below:

**Bucket**

In `Services > Storage > S3`, create a new bucket to store your application's files.

**Credentials**

In your AWS user menu, go to My Security Credentials, create a new Access Key and copy the keys that are generated.

**Setup**

Laravel already comes with the S3 configuration variables by default in the `.env` file, just add your account and
bucket data.

```bash
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

You need to install a [package](https://github.com/thephpleague/flysystem-aws-s3-v3) in order for the integration with
the S3 service to work correctly.

No configuration or coding are needed at this step, just execute the following command in your
terminal: `composer require league/flysystem-aws-s3-v3`.

You're all set! Let's start coding.

**Upload**

I added a new route for the method where I will implement the upload the files by integrating with the S3 service.

```php
// routes/web.php

Route::post('/storeS3', 'HomeController@storeS3')->name('home.storeS3');
```

The second parameter of the `store` method is the `disk` where we will save the file. We pass `s3` into it and Laravel
does the rest on its own.

```php
// HomeController

public function storeS3(Request $request)
{
    $request->file('profile_image')->store('/', 's3');
}
```

On the _Bucket_ page, you have access to the uploaded file.

![AWS S3 Bucket](/images/posts/laravel-storage-s3/s3-print.png)

**Preview**

There are several ways to access files on S3: through download, temporary addresses, etc. This also varies depending
on the access permissions that are configured on the bucket.

Below, I share an example of a route where I pass the file name that I want to access and, in the controller, I
redirect it to a temporary address, then it is possible to see the image I uploaded.

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

Result:

![Visualização da imagem](/images/posts/laravel-storage-s3/image-show-print.png)

See you later!
