---
title: Sample Article
description: This is a sample article to demonstrate content handling in NuxtJS
date: 2025-07-17
---

# Sample Article

This is a sample article to demonstrate how content can be handled in the NuxtJS project, similar to how MDX is used in the NextJS template.

## Markdown Features

The content module in NuxtJS supports all standard Markdown features, including:

- **Bold text** and *italic text*
- Lists (like this one)
- [Links](https://nuxt.com)
- Code blocks

```js
// This is a code block
const hello = 'world';
console.log(hello);
```

## Typography Styling

Thanks to the @tailwindcss/typography plugin, this content will be beautifully styled with proper spacing, font sizes, and colors.

## Images

You can also include images in your content:

![Sample Image](https://placehold.co/600x400)

## GitHub Flavored Markdown

Thanks to the remark-gfm plugin, you can use GitHub Flavored Markdown features like tables:

| Feature | Supported |
| ------- | --------- |
| Tables | ✅ |
| Strikethrough | ✅ |
| Autolinks | ✅ |
| Task Lists | ✅ |

## Syntax Highlighting

Code blocks are syntax highlighted using Prism via the rehype-prism plugin:

```css
.prose {
  @apply max-w-3xl mx-auto;
}

.prose h1 {
  @apply text-3xl font-bold mb-6;
}
```

This demonstrates how the template's styling and content handling has been migrated to the NuxtJS project.
