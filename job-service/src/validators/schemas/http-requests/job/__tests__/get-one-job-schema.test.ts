import { v4 as uuid } from 'uuid';

import getOneJobSchema from '../get-one-job-schema';

const makeSut = () => ({ sut: getOneJobSchema });

describe(getOneJobSchema.name, () => {
  it('returns the params, means its success - ID', async () => {
    const { sut } = makeSut();
    const params = {
      id: uuid(),
    };
    const result = await sut(params);
    expect(result).toEqual(params);
  });

  it('throws an error if no params is passed', async () => {
    const { sut } = makeSut();
    return expect(sut({})).rejects.toBeDefined();
  });

  it('throws an error if unknown key is passed', async () => {
    const { sut } = makeSut();
    const params = {
      unknownKey: 'any_value',
    };
    return expect(sut(params)).rejects.toBeDefined();
  });

  it('throws an error if more than one key is passed', async () => {
    const { sut } = makeSut();
    const params = {
      id: uuid(),
      any_other_key: '1234',
    };
    return expect(sut(params)).rejects.toBeDefined();
  });
});
