import JobBuilder from '../../../../../../../test-suite/builders/jobs/job-builder';
import entitiesCollections from '../../../../../../../test-suite/entities-collections';
import {
  collectionInit,
  connect,
  disconnect,
  dropDatabase,
  makeSutRequest,
} from '../../../../../../../test-suite/utils';
import updateJobValidator from '../../../../../../../test-suite/validations/schemas/http-response/job/update-job-validator';
import { CollectionNames } from '../../../../../../constants';
import { JobModel } from '../../models';
import { makeUpdateOneEntity } from '../index';

const makeSut = (model = JobModel) => ({
  sut: makeUpdateOneEntity,
  model,
});

describe(makeUpdateOneEntity.name, () => {
  const { sut, model } = makeSut();

  beforeAll(async () => {
    await connect();
    await collectionInit(JobModel, CollectionNames.Jobs);
  });

  afterAll(async () => {
    await dropDatabase();
    await disconnect();
  });

  it('should update a entity prop having the passed ID', async () => {
    const { id } = entitiesCollections.jobs[0];
    const body = new JobBuilder().withTitle().build();
    const req = { query: { id }, body };
    const result = await makeSutRequest(sut({ model }), req.query, req.body);

    const validated = await updateJobValidator(result);
    expect(validated).toBeDefined();
    expect(result.title).toBe(req.body.title);
  });

  it('should get an error due to entity not found', async () => {
    const req = { query: { id: 'nonexisting-id' }, body: { title: 'any title' } };
    try {
      await makeSutRequest(sut({ model }), req.query, req.body);
      fail('Should not reach here');
    } catch (error) {
      expect(true);
    }
  });
});
