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
    const newAccount = new JobBuilder().withAll().withId().build();
    const result = await makeSutRequest(sut({ model }), newAccount);
    const validated = await createJobValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to missing required fields', async () => {
    const newAccount = new JobBuilder().withTitle().build();
    try {
      await makeSutRequest(sut({ model }), newAccount);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
