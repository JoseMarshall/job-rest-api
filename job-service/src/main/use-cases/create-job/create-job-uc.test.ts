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

const mockMessageBroker = jest.fn().mockReturnValue({
  connect: jest.fn(async () => ({
    createChannel: jest.fn(async () => ({
      assertQueue: jest.fn(),
      sendToQueue: jest.fn(),
    })),
  })),
  disconnect: jest.fn(async () => ({})),
});

const makeSut = () => ({
  sut: createJobUC,
  messageBroker: mockMessageBroker(),
});

describe(`${createJobUC.name} use-case`, () => {
  const { sut, messageBroker } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should create a job', async () => {
    const newJob = new JobBuilder().withAll().build();
    const result = await makeSutRequest(sut({ uow: uow(), messageBroker }), newJob);
    const validated = await createJobValidator(result.payload);

    expect(validated).toBeDefined();
  });
});
