import entitiesCollections from '../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../test-suite/utils';
import customErrorValidator from '../../../../test-suite/validations/schemas/http-response/errors/custom-error';
import deleteSubscriptionValidator from '../../../../test-suite/validations/schemas/http-response/subscription/delete-one-subscription-validator';
import { CollectionNames } from '../../../constants';
import { SubscriptionModel } from '../../external/repositories/mongodb/models';
import uow from '../../external/repositories/mongodb/unit-of-work';
import { deleteSubscriptionUC } from './index';

const makeSut = () => ({
  sut: deleteSubscriptionUC,
  unitOfWork: uow(),
});

describe(`${deleteSubscriptionUC.name} use-case`, () => {
  const { sut, unitOfWork } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should remove the subscription associated to the passed id', async () => {
    const job = entitiesCollections[CollectionNames.Subscriptions][0];

    const query = { id: job.id };
    const result = await makeSutRequest(sut(unitOfWork), query);
    const validated = await deleteSubscriptionValidator(result.payload);

    expect(validated).toBeDefined();
  });

  it('should receive a custom error due to not found subscription or already deleted', async () => {
    const job = entitiesCollections[CollectionNames.Subscriptions][0];
    await SubscriptionModel.updateOne({ id: job.id }, { isDeleted: true });

    const query = {
      id: job.id,
    };
    try {
      throw await makeSutRequest(sut(unitOfWork), query);
    } catch (error) {
      const validated = await customErrorValidator(error);
      expect(validated).toBeDefined();
    }
  });
});
