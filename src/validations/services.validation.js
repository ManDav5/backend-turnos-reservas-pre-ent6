import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().min(1, 'La descripción es obligatoria'),
  category: z.string().min(1, 'La categoría es obligatoria'),
  duration: z.number().int().positive(),
  price: z.number().positive(),
});

export const updateServiceSchema = createServiceSchema.partial();
