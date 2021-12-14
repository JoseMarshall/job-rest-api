import faker from 'faker';

import collections from '../../../../../test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { CollectionNames } from '../../../../constants';
import { JobModel } from '../../../external/repositories/mongodb/models';

describe(`Method GET api/v1/jobs/:id should enable an Job`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response and a message', async () => {
    const job = collections.jobs[1];
    const response = await apiRequest.get(`api/v1/jobs/${job.id}`).send();
    expect(response.status).toBe(200);
  });

  it('should return a 404 code response due to not found Job', async () => {
    const response = await apiRequest.get(`api/v1/jobs/${faker.datatype.uuid()}`).send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(404);
    expect(validated).toBeDefined();
  });
});
