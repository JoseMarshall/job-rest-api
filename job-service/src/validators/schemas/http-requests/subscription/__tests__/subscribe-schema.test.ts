import SubscriptionBuilder from '../../../../../../test-suite/builders/subscription/subscription-builder';
import subscribeSchema from '../subscribe-schema';

const makeSut = () => ({ sut: subscribeSchema });

describe(subscribeSchema.name, () => {
  it('returns the body, means its success', async () => {
    const { sut } = makeSut();
    const body = new SubscriptionBuilder().withName().withEmail().build();
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
    const body = new SubscriptionBuilder().withName().withEmail('Invalid email').build();

    try {
      await sut(body);
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });

  it('throws an error if unknown keys passed', async () => {
    const { sut } = makeSut();
    const body = new SubscriptionBuilder().withName().withEmail().build();
    try {
      await sut({ ...body, unknownKey: 'any_value' });
    } catch (error) {
      expect(error.statusCode).toBe(422);
    }
  });
});
