import { z } from 'zod';
import { Vehicle } from './IVehicle';

export const Motorcycle = Vehicle.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().min(1).lte(2500),
});

export type IMotorcycle = z.infer<typeof Motorcycle>;