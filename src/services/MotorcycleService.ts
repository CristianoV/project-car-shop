import { IMotorcycle, Motorcycle } from '../interfaces/IMotorcycle';
import Motorcy from '../models/MotorcycleModel';
import MongoService from './MongoService';

export default class CarService extends MongoService<IMotorcycle> {
  constructor(
    _model = new Motorcy(),
    _schema = Motorcycle,
  ) {
    super(_model, _schema);
  }
}