import { defineCollection, z } from 'astro:content';

const commandsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // Required fields with validation
        title: z.string().min(10).max(100),
        date: z.date(),
        summary: z.string().min(50).max(300),
        author: z.string().default("Tim Cane + Claude"),

        // Arrays with validation
        tags: z.array(z.string()).min(1).max(10),
        filesChanged: z.array(z.string()).min(1),
        tools: z.array(z.string()).default(["Claude 3.5 Sonnet", "Cursor"]),

        // Additional metadata
        codeSnippets: z.number().optional(),
        aiPromptCount: z.number().optional(),
        category: z.enum(['Setup', 'Feature', 'Bug Fix', 'Enhancement', 'Refactor']).default('Enhancement'),

        // Related content
        relatedPosts: z.array(z.string()).optional(),
        prerequisites: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'commands': commandsCollection,
}; 