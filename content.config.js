import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    journal: defineCollection({
      type: 'page',
      source: 'journal/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        author: z.string(),
      }),
    }),
  },
});
