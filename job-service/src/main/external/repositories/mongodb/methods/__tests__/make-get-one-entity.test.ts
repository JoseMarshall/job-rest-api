/* eslint-disable no-underscore-dangle */
import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import getOneJobValidator from '../../../../../../../test-suite/validations/schemas/http-response/job/get-one-job-validator';
import { CollectionNames } from '../../../../../../constants';
import { JobModel } from '../../models';
import { makeGetOneEntity } from '../index';

const makeSut = (model = JobModel) => ({
  sut: makeGetOneEntity,
  model,
});

describe(makeGetOneEntity.name, () => {
  const { sut, model } = makeSut();
  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should get the entity with this model having the passed ID', async () => {
    const query = { id: entitiesCollections.jobs[0].id };
    const result = await makeSutRequest(sut({ model, options: {} }), query);
    const validated = await getOneJobValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get the entity with the data formatted', async () => {
    const query = { id: entitiesCollections.jobs[0].id };
    const formatData = data => ({
      ...data,
      newField: 'newValue',
    });

    const result = await makeSutRequest(
      sut({
        model,
        options: {
          formatData,
        },
      }),
      query
    );

    expect(result.newField).toBe('newValue');
  });

  it('should get the entity with specified projection fields', async () => {
    const query = { id: entitiesCollections.jobs[0].id };

    const result = await makeSutRequest(
      sut({
        model,
        options: { projection: { title: true } },
      }),
      query
    );

    expect(Object.keys(result).some(key => key !== 'title')).toBe(false);
  });

  it('should get an error due to entity not found', async () => {
    const query = { id: 'nonexisting-id' };
    try {
      await makeSutRequest(sut({ model, options: {} }), query);
      fail('should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
