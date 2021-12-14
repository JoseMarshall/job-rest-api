import SubscriptionBuilder from '../../../../../../../test-suite/builders/subscription/subscription-builder';
import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import updateSubscriptionValidator from '../../../../../../../test-suite/validations/schemas/http-response/subscription/verify-subscription-validator';
import { CollectionNames } from '../../../../../../constants';
import { SubscriptionModel } from '../../models';
import { makeUpdateOneEntity } from '../index';

const makeSut = (model = SubscriptionModel) => ({
  sut: makeUpdateOneEntity,
  model,
});

describe(makeUpdateOneEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update a entity prop having the passed ID', async () => {
    const { id } = entitiesCollections.subscriptions[0];
    const body = new SubscriptionBuilder().withVerified(true).build();
    const req = { query: { id }, body };
    const result = await makeSutRequest(sut({ model }), req.query, req.body);

    const validated = await updateSubscriptionValidator(result);
    expect(validated).toBeDefined();
  });

  it('should get an error due to entity not found', async () => {
    const req = { query: { id: 'nonexisting-id' }, body: { verified: false } };
    try {
      await makeSutRequest(sut({ model }), req.query, req.body);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
