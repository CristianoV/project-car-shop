// template para criação dos testes de cobertura da camada de service

import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { allCarsMock, newCarMock, newCarMockWithId } from '../utils/mocks';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Testes na camada de Service - Car', () => {
  const frameModel = new CarModel();
  const frameService = new CarService(frameModel);

  before(async () => {
    sinon.stub(frameModel, 'create').resolves(newCarMockWithId);
    sinon.stub(frameModel, 'read').resolves(allCarsMock); 
    sinon.stub(frameModel, 'readOne').onCall(0).resolves(newCarMockWithId).onCall(1).resolves(null); 
  });

  after(() => {
    sinon.restore();
  });

	describe('Criando novo carro', () => {
		it('Success', async () => {
			const frameCreated = await frameService.create(newCarMock);

			expect(frameCreated).to.be.deep.equal(newCarMockWithId);
		});

		it('Failure', async () => {
			let error;
			try {
				await frameService.create({});
			} catch (err) {
				error = err
			}
			expect(error).to.be.instanceOf(ZodError);
		});
	});

  describe('Todos os carros', () => {
		it('Success', async () => {
			const frameCreated = await frameService.read();

			expect(frameCreated).to.be.deep.equal(allCarsMock);
		});
	});

  describe('procurando carros por Id', () => {
		it('Success', async () => {
			const frameCreated = await frameService.readOne(newCarMockWithId._id);

			expect(frameCreated).to.be.deep.equal(newCarMockWithId);
		});

		it('Failure', async () => {
      let error;
			try {
				await frameService.readOne(newCarMockWithId._id);
			} catch (err:any) {
				error = err
			}

			expect(error, 'error should be defined').not.to.be.undefined;
			expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
});
