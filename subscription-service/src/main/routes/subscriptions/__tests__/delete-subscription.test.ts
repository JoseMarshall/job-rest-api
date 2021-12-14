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
import { ApiMessages, CollectionNames } from '../../../../constants';
import { SubscriptionModel } from '../../../external/repositories/mongodb/models';

describe(`Method DELETE /api/v1/subscriptions/:id should delete a subscription`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 200 code response and a message', async () => {
    const subscription = collections.subscriptions[0];
    const response = await apiRequest.delete(`/api/v1/subscriptions/${subscription.id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toContain(ApiMessages.DeletedSuccessfully);
  });

  it('should return a 404 code response due to not found subscription', async () => {
    const response = await apiRequest.delete(`/api/v1/subscriptions/${faker.datatype.uuid()}`).send();
    const validated = await MsgBodyErrorValidator(response.body);

    expect(response.status).toBe(404);
    expect(validated).toBeDefined();
  });
});
