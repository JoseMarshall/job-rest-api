/* eslint-disable no-underscore-dangle */
import { makeSutRequest } from '../../../../test-suite/utils';
import makeDeleteEntityController from '.';

const mockGetOneDependency = jest.fn().mockImplementation(async _ =>
  Promise.resolve({
    payload: {
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
);

const mockRequestValidatorDependency = jest
  .fn()
  .mockImplementation(async req => Promise.resolve(req.params));

const makeSut = (
  getOne = mockGetOneDependency,
  requestValidator = mockRequestValidatorDependency
) => ({
  sut: makeDeleteEntityController,
  getOne,
  requestValidator,
});

describe(`${makeDeleteEntityController.name} Controller`, () => {
  const { sut, getOne, requestValidator } = makeSut();

  it('should receive a 200 status code and call the dependency with given data', async () => {
    const req = { params: { id: '1234567890' } };
    const result = await makeSutRequest(sut({ getOne, requestValidator }), req);

    expect(result.status).toBe(200);
    expect(result.body.isDeleted).toBe(false);
    expect(mockRequestValidatorDependency).toHaveBeenCalledWith(req);
    expect(mockGetOneDependency).toHaveBeenCalledWith(req.params);
  });
});
