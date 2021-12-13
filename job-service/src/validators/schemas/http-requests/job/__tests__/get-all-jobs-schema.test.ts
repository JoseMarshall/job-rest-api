import faker from 'faker';

import getAllJobsSchema from '../get-all-jobs-schema';

const makeSut = () => ({ sut: getAllJobsSchema });

describe(getAllJobsSchema.name, () => {
  it('returns the query, means its success ', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      limit: '10',
      title: faker.commerce.product(),
    };

    const result = await sut(query);
    expect(result).toEqual(query);
  });

  it('throws an error if no query is passed', async () => {
    const { sut } = makeSut();
    try {
      await sut({});
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if at least one field is not valid - title cannot be empty', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      title: '',
    };

    try {
      await sut(query);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const query = {
      page: '1',
      title: faker.commerce.product(),
    };

    try {
      await sut({ ...query, unknownKey: 'foo' });
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
