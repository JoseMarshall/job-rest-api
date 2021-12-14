import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import getAllJobsValidator from '../../../../test-suite/validations/schemas/http-response/job/get-all-jobs-validator';
import { CollectionNames } from '../../../constants';
import { JobModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { listJobsUC } from './index';

const makeSut = async () => ({
  sut: listJobsUC,
  unitOfWork: uow(),
});

describe(`${listJobsUC.name} use-case`, async () => {
  const { sut, unitOfWork } = await makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should receive jobs object which obey the getAllJobsValidator', async () => {
    const result = await makeSutRequest(sut(unitOfWork), { page: 1, limit: 3 });
    const validated = await getAllJobsValidator(result.payload);
    expect(validated).toBeDefined();
  });
});
