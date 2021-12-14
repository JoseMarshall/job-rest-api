import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import getAllJobsValidator from '../../../../../test-suite/validations/schemas/http-response/job/get-all-jobs-validator';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../../constants';
import { JobModel } from '../../../external/repositories/mongodb/models';

describe(`Method GET api/v1/jobs should list Jobs`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response', async () => {
    const response = await apiRequest.get('api/v1/jobs').query({ page: '1', limit: '3' }).send();
    const validated = await getAllJobsValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
    expect(response.body.payload.data.length).toBeGreaterThan(0);
  });

  it('should return a 200 code response - Filter by title', async () => {
    const response = await apiRequest
      .get('api/v1/jobs')
      .query({ page: '1', limit: '3', title: 'Developer' })
      .send();
    const validated = await getAllJobsValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
  });

  it('should return a 200 code response - Filter by skills', async () => {
    const response = await apiRequest
      .get('api/v1/jobs')
      .query({ page: '1', limit: '3', skills: 'node.js,react.js,mongodb' })
      .send();
    const validated = await getAllJobsValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
  });

  it('should return a 200 code response - Filter by company name', async () => {
    const response = await apiRequest
      .get('api/v1/jobs')
      .query({ page: '1', limit: '3', 'company-name': 'TAIKAI' })
      .send();
    const validated = await getAllJobsValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
  });

  it('should return a 422 since page is not valid', async () => {
    const response = await apiRequest.get('api/v1/jobs').query({ page: 'abc', limit: '3' }).send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
