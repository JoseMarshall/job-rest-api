import JobBuilder from '../../../../../../../test-suite/builders/jobs/job-builder';
import {
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import createJobValidator from '../../../../../../../test-suite/validations/schemas/http-response/job/create-job-validator';
import { JobModel } from '../../models';
import { makeCreateEntity } from '../index';

const makeSut = (model = JobModel) => ({
  sut: makeCreateEntity,
  model,
});

describe(makeCreateEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should create an entity in mongodb repository', async () => {
    const newJob = new JobBuilder().withAll().withId().build();
    const result = await makeSutRequest(sut({ model }), newJob);
    const validated = await createJobValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to missing required fields', async () => {
    const newJob = new JobBuilder().withTitle().build();
    try {
      await makeSutRequest(sut({ model }), newJob);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
