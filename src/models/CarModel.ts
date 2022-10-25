import { model as createCarModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { ICar } from '../interfaces/ICar';

const carMongooseSchema = new Schema<ICar>({
  doorsQty: Number,
  seatsQty: Number,
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = createCarModel('Car', carMongooseSchema)) {
    super(model);
  }
}
