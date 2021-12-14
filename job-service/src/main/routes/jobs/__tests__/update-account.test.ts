import faker from 'faker';

import JobBuilder from '../../../../../test-suite/builders/jobs/job-builder';
import collections from '../../../../../test-suite/entities-collections';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import updateJobValidator from '../../../../../test-suite/validations/schemas/http-response/job/update-job-validator';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { JobModel } from '../../../external/repositories/mongodb/models';

describe(`Method PATCH /api/v1/jobs/:id should update a job`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response', async () => {
    const { id } = collections.jobs[0];
    const updatingField = new JobBuilder().withTitle().build();
    const response = await apiRequest.patch(`/api/v1/jobs/${id}`).send(updatingField);
    const validated = await updateJobValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.UpdatedSuccessfully);
  });

  it('should return a 422 code response due to job not found', async () => {
    const updatingField = new JobBuilder().withTitle().build();
    const response = await apiRequest
      .patch(`/api/v1/jobs/${faker.datatype.uuid()}`)
      .send(updatingField);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(response.body.msg).toContain(ApiMessages.FailureUpdating);
    expect(validated).toBeDefined();
  });
});
