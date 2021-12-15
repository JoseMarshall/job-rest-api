/* eslint-disable no-underscore-dangle */
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import { CollectionNames } from '../../../../../../constants';
import { SubscriptionModel } from '../../models';
import { makeGetAllEntities } from '../index';

const makeSut = (model = SubscriptionModel) => ({
  sut: makeGetAllEntities,
  model,
});

describe(makeGetAllEntities.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(SubscriptionModel, CollectionNames.Subscriptions);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should get only 2 first entities', async () => {
    const query = {
      page: 1,
      limit: 2,
    };

    const result = await makeSutRequest(
      sut({
        model,
        options: {},
      }),
      query
    );
    expect(result.data.length).toBe(2);
  });

  it('should add a new field to each returned entity', async () => {
    function formatData(data: ReadonlyArray<any>) {
      return data.flatMap(element => [
        { newField: `${element[Object.keys(element)[0]]} - ${Date.now()}` },
      ]);
    }
    const query = {
      page: 1,
    };

    const result = await makeSutRequest(
      sut({
        model,
        options: {
          formatData,
        },
      }),
      query
    );

    expect(result.data.some(element => !element.newField)).toBe(false);
  });
});
