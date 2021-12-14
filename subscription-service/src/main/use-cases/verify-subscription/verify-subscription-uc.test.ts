import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import verifySubscriptionValidator from '../../../../test-suite/validations/schemas/http-response/subscription/verify-subscription-validator';
import { CollectionNames } from '../../../constants';
import { SubscriptionModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { verifySubscriptionUC } from './index';

const makeSut = () => ({
  sut: verifySubscriptionUC,
  unitOfWork: uow(),
});

describe(`${verifySubscriptionUC.name} use-case`, () => {
  const { sut, unitOfWork } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should verify the subscription', async () => {
    const subscription = entitiesCollections[CollectionNames.Subscriptions][0];

    const params = { id: subscription.id };
    const result = await makeSutRequest(sut(unitOfWork), params);
    const validated = await verifySubscriptionValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a custom error due to not found Subscription', async () => {
    const params = { id: 'non-existing id' };
    try {
      throw await makeSutRequest(sut(unitOfWork), params);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
