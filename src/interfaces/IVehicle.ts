import { z } from 'zod';

const Vehicle = z.object({
  model: z.string().min(3),
  year: z.number().gte(1900).lte(2022).int(),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
});

export type IVehicle = z.infer<typeof Vehicle>;
