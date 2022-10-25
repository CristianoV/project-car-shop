import { z } from 'zod';
import { Vehicle } from './IVehicle';

export const car = Vehicle.extend({
  doorsQty: z.number().int().min(2),
  seatsQty: z.number().int().min(2),
});

export type ICar = z.infer<typeof car>;