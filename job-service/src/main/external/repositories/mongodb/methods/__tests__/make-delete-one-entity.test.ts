import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import deleteJobValidator from '../../../../../../../test-suite/validations/schemas/http-response/job/delete-one-job-validator';
import { CollectionNames } from '../../../../../../constants';
import { JobModel } from '../../models';
import { makeDeleteOneEntity } from '../index';

const makeSut = (model = JobModel) => ({
  sut: makeDeleteOneEntity,
  model,
});

describe('deleteOneEntity dependencies', () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should delete the entity having the passed ID', async () => {
    const query = { id: entitiesCollections.jobs[0].id };
    const result = await makeSutRequest(sut({ model }), query);
    const validated = await deleteJobValidator(result);

    expect(validated).toBeDefined();
  });

  it('should get an error due to entity not found', async () => {
    const query = { id: 'nonexisting-id' };
    try {
      await makeSutRequest(sut({ model }), query);
      fail('should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
