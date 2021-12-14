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
import verifySubscriptionValidator from '../../../../../test-suite/validations/schemas/http-response/subscription/verify-subscription-validator';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { SubscriptionModel } from '../../../external/repositories/mongodb/models';

describe(`Method PATCH /api/v1/subscriptions/:id should verify a subscription`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response', async () => {
    const { id } = collections.subscriptions[0];
    const response = await apiRequest.patch(`/api/v1/subscriptions/${id}`).send({});
    const validated = await verifySubscriptionValidator(response.body.payload);

    expect(response.status).toBe(200);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.UpdatedSuccessfully);
  });

  it('should return a 422 code response due to subscription not found', async () => {
    const response = await apiRequest
      .patch(`/api/v1/subscriptions/${faker.datatype.uuid()}`)
      .send({});

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(response.body.msg).toContain(ApiMessages.FailureVerifying);
    expect(validated).toBeDefined();
  });
});
