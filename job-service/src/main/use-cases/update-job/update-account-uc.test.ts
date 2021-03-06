import JobBuilder from '../../../../test-suite/builders/jobs/job-builder';
import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import updateJobValidator from '../../../../test-suite/validations/schemas/http-response/job/update-job-validator';
import { CollectionNames } from '../../../constants';
import { JobModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { updateJobUC } from './index';

const makeSut = () => ({
  sut: updateJobUC,
  unitOfWork: uow(),
});

describe(`${updateJobUC.name} use-case`, () => {
  const { sut, unitOfWork } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update the Job title and description - quering by id', async () => {
    const Job = entitiesCollections[CollectionNames.Jobs][0];
    const updatingFields = new JobBuilder().withTitle().withDescription().build();

    const req = { params: { id: Job.id }, body: updatingFields };
    const result = await makeSutRequest(sut(unitOfWork), req);
    const validated = await updateJobValidator(result.payload);

    expect(validated).toBeDefined();
    expect(result.payload).toMatchObject(updatingFields);
  });

  it('should receive a custom error due to not found Job', async () => {
    const updatingFields = new JobBuilder().withTitle().build();

    const req = {
      params: { id: 'non-existing id' },
      body: updatingFields,
    };
    try {
      throw await makeSutRequest(sut(unitOfWork), req);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
