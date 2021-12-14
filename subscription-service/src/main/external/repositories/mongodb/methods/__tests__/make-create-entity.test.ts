import SubscriptionBuilder from '../../../../../../../test-suite/builders/subscription/subscription-builder';
import {
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import createSubscriptionValidator from '../../../../../../../test-suite/validations/schemas/http-response/subscription/create-subscription-validator';
import { SubscriptionModel } from '../../models';
import { makeCreateEntity } from '../index';

const makeSut = (model = SubscriptionModel) => ({
  sut: makeCreateEntity,
  model,
});

describe(makeCreateEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
    await dropDatabase();
  });

  it('should create an entity in mongodb repository', async () => {
    const newSubscription = new SubscriptionBuilder().withAll().withId().build();
    const result = await makeSutRequest(sut({ model }), newSubscription);
    const validated = await createSubscriptionValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to missing required fields', async () => {
    const newSubscription = new SubscriptionBuilder().withName().build();
    try {
      await makeSutRequest(sut({ model }), newSubscription);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
