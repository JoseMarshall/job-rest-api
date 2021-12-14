import JobBuilder from '../../../../test-suite/builders/jobs/job-builder';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import createJobValidator from '../../../../test-suite/validations/schemas/http-response/job/create-job-validator';
import { CollectionNames } from '../../../constants';
import { JobModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { createJobUC } from './index';

const makeSut = () => ({
  sut: createJobUC,
});

describe(`${createJobUC.name} use-case`, () => {
  const { sut } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should create an account', async () => {
    const { id, ...newJob } = new JobBuilder().withAll().build();
    const result = await makeSutRequest(sut(uow()), newJob);
    const validated = await createJobValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload).toMatchObject(newJob);
  });
});
