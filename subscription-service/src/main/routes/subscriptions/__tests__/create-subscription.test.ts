import SubscriptionBuilder from '../../../../../test-suite/builders/subscription/subscription-builder';
import {
  apiRequest,
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
} from '../../../../../test-suite/utils';
import { MsgBodyErrorValidator } from '../../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import createSubscriptionValidator from '../../../../../test-suite/validations/schemas/http-response/subscription/create-subscription-validator';
import collections from '../../../../../test-suite/entities-collections';
import { ApiMessages, CollectionNames } from '../../../../constants';
import { SubscriptionModel } from '../../../external/repositories/mongodb/models';

jest.mock('../../../external/message-brokers/helpers.ts', () => ({
  __esModule: true,
  pubMessage: jest.fn(async () => ({})),
}));

describe(`Method POST /api/v1/subscriptions should create a subscription`, () => {
  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should return a 201 code response', async () => {
    const newSubscription = new SubscriptionBuilder().withName().withEmail().build();
    const response = await apiRequest.post('/api/v1/subscriptions').send(newSubscription);
    const validated = await createSubscriptionValidator(response.body.payload);

    expect(response.status).toBe(201);
    expect(validated).toBeDefined();
    expect(response.body.msg).toContain(ApiMessages.CreatedSuccessfully);
  });

  it('should return a 422 code response due to duplicated email', async () => {
    const existingSubscription = collections.subscriptions[0];
    const { id, ...newAccount } = new SubscriptionBuilder()
      .withName()
      .withEmail(existingSubscription.email as string)
      .build();
    const response = await apiRequest.post('/api/v1/subscriptions').send(newAccount);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(response.body.msg).toContain(ApiMessages.DuplicatedValue);
    expect(validated).toBeDefined();
  });

  it('should return a 422 code response due to invalid fields - Invalid Email', async () => {
    const newSubscription = new SubscriptionBuilder().withEmail('invalid email').withName().build();
    const response = await apiRequest.post('/api/v1/subscriptions').send(newSubscription);

    const validated = await MsgBodyErrorValidator(response.body);
    expect(response.status).toBe(422);
    expect(validated).toBeDefined();
  });
});
