import { Model, UpdateQuery } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T>) {}

  public async create(data: T): Promise<T> {
    return this.model.create({ ...data });
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, data: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      id,
      { ...data } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id });
  }
}
