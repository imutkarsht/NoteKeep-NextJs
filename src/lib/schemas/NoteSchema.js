import { z } from 'zod';

export const NoteSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' })
    .trim(),

  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' })
    .max(500, { message: 'Content cannot exceed 500 characters' })
    .trim(),

  tags: z
    .array(
      z
        .string()
        .min(2, { message: 'Each tag must have at least 2 characters' })
        .max(30, { message: 'Each tag cannot exceed 30 characters' })
    )
    .optional(),
});
