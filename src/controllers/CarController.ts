import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const results = await this.service.create(req.body);
    return res.status(201).json(results);
  }
}
