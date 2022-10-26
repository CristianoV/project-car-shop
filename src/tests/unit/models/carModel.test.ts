import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import {
  allCarsMock,
  newCarMock,
  newCarMockUpdated,
  newCarMockWithId,
} from '../utils/mocks';
import { Model } from 'mongoose';
const { expect } = chai;

describe('Testes na camada de Model - Car', () => {
  const frameModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(newCarMockWithId);
    sinon.stub(Model, 'findById').resolves(newCarMockWithId);
    sinon.stub(Model, 'find').resolves(allCarsMock);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(newCarMockUpdated);
    sinon.stub(Model, 'findOneAndDelete').resolves(newCarMockWithId);
  });

  after(() => {
    sinon.restore();
  });
  it('Novo carro criado com sucesso', async () => {
    const newFrame = await frameModel.create(newCarMock);
    expect(newFrame).to.be.deep.equal(newCarMockWithId);
  });

  it('Todos carros cadastrados', async () => {
    const newFrame = await frameModel.read();
    expect(newFrame).to.be.deep.equal(allCarsMock);
  });

  it('Buscando carro por Id', async () => {
    const newFrame = await frameModel.readOne('63586114835b78635859453f');
    expect(newFrame).to.be.deep.equal(newCarMockWithId);
  });
  it('Buscando por um Id invalido', async () => {
    let error;
    try {
      await frameModel.readOne('123ERRADO');
    } catch (err: any) {
      error = err;
    }
    expect(error.message).to.be.eq('InvalidMongoId');
  });

  it('fazendo update em um carro', async () => {
    const newFrame = await frameModel.update(
      '63586114835b78635859453f',
      newCarMock
    );
    expect(newFrame).to.be.deep.equal(newCarMockUpdated);
  });
  it('fazendo update em um carro por um Id invalido', async () => {
    let error;
    try {
      await frameModel.update('123ERRADO', newCarMock);
    } catch (err: any) {
      error = err;
    }
    expect(error.message).to.be.eq('InvalidMongoId');
  });

  it('fazendo delete de um carro', async () => {
    const newFrame = await frameModel.delete('63586114835b78635859453f');
    expect(newFrame).to.be.deep.equal(newCarMockWithId);
  });
  it('fazendo delete de um carro por um Id invalido', async () => {
    let error;
    try {
      await frameModel.delete('123ERRADO');
    } catch (err: any) {
      error = err;
    }
    expect(error.message).to.be.eq('InvalidMongoId');
  });
});
