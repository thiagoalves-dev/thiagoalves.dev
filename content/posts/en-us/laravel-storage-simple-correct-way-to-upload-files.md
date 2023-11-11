---
date: '2020-04-18'
title: 'Laravel Storage: simple, correct way to upload files'
description: 'Exemplifying how to upload files using Laravel Storage and the difference between public and private files.'
keywords: 'Storage, Upload, Files'
ptBrSlug: 'laravel-storage-upload-de-arquivos-de-forma-simples-e-correta'
---

Managing files is a very common feature for any kind of system, website, mobile app and so on. From public photos to
private reports, many types of files require specific storage approaches.

The way Laravel handles this issue is incredibly simple. Basically, if you use the structure that the framework
provides, you will hardly have any problems with it.

I created a project to use as an example. You can see the code in the following
link: [thiagoalves-dev/laravel-storage-example](https://github.com/thiagoalves-dev/laravel-storage-example).

I made a very simple HTML to simulate a form where a user profile photo will be uploaded.

```html
<!-- home.blade.php -->

<form action="/store" method="post" enctype="multipart/form-data">
    @csrf
    <input name="profile_image" type="file">
    <button type="submit">Submit</button>
</form>
```

#### Saving the file as private

In this case, the image will only be accessible by implementing a functionality that allows that. Whether viewing or
downloading.

```php
// HomeController

public function store(Request $request)
{
    $request->file('profile_image')->store('/');
}
```

#### Saving the file as public

In this case, the image will be accessible to anyone once the user has the URL to do that.

```php
// HomeController

public function store(Request $request)
{
    $request->file('profile_image')->store('/', 'public');
}
```

Laravel already comes with the `storage/app/public` folder configured.

```php
// config/filesystems.php

'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'),
    'url' => env('APP_URL').'/storage',
    'visibility' => 'public',
]
``` 

You only need to create a symlink to the Laravel's public directory to make your public files accessible via browser.

Execute the following command: `php artisan storage:link`.

![Result of the command above](/images/posts/laravel-storage/storage-on-public-folder.png)

Result:

![See the image on the browser](/images/posts/laravel-storage/image-public-access.png)

See you later!
