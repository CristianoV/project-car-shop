import { model as createCarModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  category: {
    type: String,
    enum: ['Street', 'Custom', 'Trail'],
    required: true,
  },
  engineCapacity: Number,
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
}, { versionKey: false });

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = createCarModel('Motorcycles', motorcycleMongooseSchema)) {
    super(model);
  }
}
