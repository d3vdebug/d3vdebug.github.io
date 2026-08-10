import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['TryHackMe', 'HackTheBox', 'picoCTF', 'Portswigger', 'OverTheWire', 'Notes', 'Tool Guides', 'Cheatsheets']),
    tags: z.array(z.string()),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']).optional(),
    platform: z.string().optional(),
    image: z.string().optional(),
    unlisted: z.boolean().optional(),
    dateModified: z.coerce.date().optional(),
  }),
});

export const collections = { writeups };
