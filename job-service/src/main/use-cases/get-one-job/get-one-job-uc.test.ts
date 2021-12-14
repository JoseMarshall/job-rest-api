import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import getOneJobValidator from '../../../../test-suite/validations/schemas/http-response/job/get-one-job-validator';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../constants';
import { JobModel } from '../../external/repositories/mongodb/models';
import { getOneJobUC } from './index';
import uow from '../../external/repositories/mongodb/unit-of-work';

const makeSut = async () => ({
  sut: getOneJobUC,
  unitOfWork: await uow(),
});

describe(`${getOneJobUC.name} use-case`, async () => {
  const { sut, unitOfWork } = await makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should disable the job associated to the passed id', async () => {
    const job = entitiesCollections[CollectionNames.Jobs][0];

    const query = { id: job.id };
    const result = await makeSutRequest(sut(unitOfWork), query);
    const validated = await getOneJobValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a custom error due to not found job', async () => {
    const query = {
      id: 'nonexisting-id',
    };
    try {
      throw await makeSutRequest(sut(unitOfWork), query);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
