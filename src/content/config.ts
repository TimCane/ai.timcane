import { defineCollection, z } from 'astro:content';

const commandsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        summary: z.string(),
        author: z.string(),
        duration: z.string(),
        difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
        tags: z.array(z.string()),
        filesChanged: z.array(z.string()),
        tools: z.array(z.string()),
    }),
});

export const collections = {
    'commands': commandsCollection,
}; 