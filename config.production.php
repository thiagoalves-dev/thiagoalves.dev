<?php

return [
    'production'      => true,
    'siteName'        => 'Thiagoalves.dev',
    'baseUrl'         => 'https://thiagoalves.dev',
    'siteAuthor'      => 'Mastercode Web LTDA',
    'siteImage'       => 'https://thiagoalves.dev/_assets/images/programming-logo-800.png',
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
