import JobBuilder from '../../../../../test-suite/builders/jobs/job-builder';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import createJobValidator from '../../../../../test-suite/validations/schemas/http-response/job/create-job-validator';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { JobModel } from '../../../external/repositories/mongodb/models';

describe(`Method POST /api/v1/jobs should create a job`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 201 code response', async () => {
    const newJob = new JobBuilder().withAll().build();
    const response = await apiRequest.post('/api/v1/jobs').send(newJob);
    const validated = await createJobValidator(response.body.payload);

    expect(response.status).toBe(201);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.CreatedSuccessfully);
  });

  it('should return a 422 code response due to invalid fields - Invalid Title', async () => {
    const newJob = new JobBuilder().withAll().withTitle('A').build();
    const response = await apiRequest.post('/api/v1/jobs').send(newJob);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
