import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private service: IService<ICar>) {}

  public async create(req: Request, res: Response) {
    const results = await this.service.create(req.body);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response) {
    const results = await this.service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response) {
    const results = await this.service.readOne(req.params.id);
    return res.status(200).json(results);
  }

  public async update(req: Request, res: Response) {
    const results = await this.service.update(req.params.id, req.body);
    return res.status(200).json(results);
  }
}
