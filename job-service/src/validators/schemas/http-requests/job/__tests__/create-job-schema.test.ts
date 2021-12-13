import JobBuilder from '../../../../../../test-suite/builders/jobs/job-builder';
import createJobSchema from '../create-job-schema';

const makeSut = () => ({ sut: createJobSchema });

describe(createJobSchema.name, () => {
  it('returns the body, means its success', async () => {
    const { sut } = makeSut();
    const body = new JobBuilder().withAll().build();
    const result = await sut(body);
    expect(result).toEqual(body);
  });

  it('throws an error if no body is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if at least one field is not valid', async () => {
    const { sut } = makeSut();
    const body = new JobBuilder().withAll().withCompanyWebsite('Invalid website').build();

    try {
      await sut(body);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const body = new JobBuilder().withAll().build();
    try {
      await sut({ ...body, unknownKey: 'any_value' });
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
