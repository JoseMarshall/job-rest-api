import JobBuilder from '../../../../../../test-suite/builders/jobs/job-builder';
import updateJobSchema from '../update-one-job-schema';

const makeSut = () => ({ sut: updateJobSchema });

describe(updateJobSchema.name, () => {
  it('returns the req, means its success - Query Id', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new JobBuilder().withId().withCompanyName().withLocation().build();
    const req = {
      body,
      params: { id },
    };
    const result = await sut(req);
    expect(result).toEqual(req);
  });

  it('throws an error if no req is passed', async () => {
    const { sut } = makeSut();
    return expect(sut({})).rejects.toBeDefined();
  });

  it('throws an error if at least one field is not valid', async () => {
    const { sut } = makeSut();
    const req = {
      body: new JobBuilder().withDescription(),
      params: { id: 'invalid-id' },
    };
    return expect(sut(req)).rejects.toBeDefined();
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const { id, ...body } = new JobBuilder().withId().withDescription().build();
    const req = {
      body: {
        ...body,
        unknownKey: 'any_value',
      },
      params: { id },
    };
    return expect(sut(req)).rejects.toBeDefined();
  });
});
