<?php

return [
    'production'      => true,
    'siteName'        => 'Mastercode.dev',
    'baseUrl'         => 'https://mastercode.dev',
    'siteAuthor'      => 'Mastercode Web LTDA',
    'siteImage'       => 'https://mastercode.dev/_assets/images/mastercode.png',
    'siteDescription' => 'Site com a finalidade de compartilhar experiências e ajudar outros desenvolvedores.',
    'siteKeywords'    => 'Full Stack, Web, Development, Desenvolvimento, Programação, Laravel, Vue.js, PHP, Vue, Sass, Front-end, Back-end, Javascript',
    'collections'     => [
        'posts'    => [
            'author' => 'Author Name', // Default author, if not provided in a post
            'sort'   => '-date',
            'path'   => 'blog/{filename}',
            'filter' => function ($post) {
                return $post->published;
            },
        ],
        'founders' => [
            'sort' => 'sort',
        ],
    ],
];
