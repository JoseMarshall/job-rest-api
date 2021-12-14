import SubscriptionBuilder from '../../../../test-suite/builders/subscription/subscription-builder';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import createSubscriptionValidator from '../../../../test-suite/validations/schemas/http-response/subscription/create-subscription-validator';
import { CollectionNames } from '../../../constants';
import { SubscriptionModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { createSubscriptionUC } from './index';

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
  sut: createSubscriptionUC,
  messageBroker: mockMessageBroker(),
});

describe(`${createSubscriptionUC.name} use-case`, () => {
  const { sut, messageBroker } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should create a new subscription', async () => {
    const newSubscription = new SubscriptionBuilder().withAll().build();
    const result = await makeSutRequest(sut({ uow: uow(), messageBroker }), newSubscription);
    const validated = await createSubscriptionValidator(result.payload);

    expect(validated).toBeDefined();
  });
});
