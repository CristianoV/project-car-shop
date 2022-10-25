import { Schema } from 'zod';
import { ErrorTypes } from '../errors/catalog';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default abstract class CarService<T> implements IService<T> {
  constructor(
    private model: IModel<T>,
    private schema: Schema<T>,
  ) {}

  public async create(obj: unknown): Promise<T> {
    const parsed = this.schema.safeParse(obj);
    
    if (!parsed.success) {
      throw parsed.error;
    }

    return this.model.create(parsed.data);
  }

  public async read(): Promise<T[]> {
    const frame = await this.model.read();
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async readOne(_id: string): Promise<T> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    
    const frame = await this.model.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }

  public async update(_id: string, obj: unknown): Promise<T> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidMongoId);
    const parsed = this.schema.safeParse(obj);

    if (!parsed.success) {
      throw parsed.error;
    }

    const frameUpdated = await this.model.update(_id, parsed.data);

    if (!frameUpdated) {
      throw new Error(ErrorTypes.EntityNotFound);
    }

    return frameUpdated;
  }
}