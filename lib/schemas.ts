import { z } from 'zod';

export const UserSchema = z.object({
  avatar_url: z.string().nullable(),
  balance: z.number(),
  full_name: z
    .string()
    .min(1)
    .max(100)
    .refine((name) => /^[A-Za-z\s-]+$/.test(name), {
      message:
        'Names can only contain letters, spaces, hyphens',
    })
    .nullable(),
  id: z.string(),
  updated_at: z.string().optional(),
  username: z.string().max(19, 'Your username is too long.').nullable(),
  website: z.string().nullable(),
});


