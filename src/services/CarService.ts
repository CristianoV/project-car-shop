import { ICar, car } from '../interfaces/ICar';
import CarModel from '../models/CarModel';
import MongoService from './MongoService';

export default class CarService extends MongoService<ICar> {
  constructor(
    _model = new CarModel(),
    _schema = car,
  ) {
    super(_model, _schema);
  }
}