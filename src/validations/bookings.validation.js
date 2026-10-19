import { z } from 'zod';
import mongoose from 'mongoose';

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

export const bookingValidationSchema = z.object({
  clientName: z.string().min(1, 'El nombre es obligatorio').trim(),
  clientEmail: z.string().email('Debe ser un email válido').trim(),
  date: z.string().min(1, 'La fecha es obligatoria'),
  time: z.string().min(1, 'La hora es obligatoria'),
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional().default('pending'),
  services: z.array(
    z.object({
      service: z
        .string()
        .refine(isValidObjectId, { message: 'El ID del servicio no es un ObjectId válido' }),
      quantity: z.number().int().min(1, 'La cantidad mínima es 1').optional().default(1)
    })
  ).optional().default([])
});

export const addServiceToBookingSchema = z.object({
  quantity: z.number().int().min(1, 'La cantidad mínima es 1').optional().default(1)
});

export const updateBookingSchema = bookingValidationSchema.partial();


