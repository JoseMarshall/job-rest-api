import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { Verify } from '../../../validators/types/subscription';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function verifySubscriptionUC(uow: Promise<IUnitOfWork>) {
  return async (query: Verify) => {
    try {
      const subscriptionRepo = (await uow).makeSubscriptionRepository();

      await subscriptionRepo.update({ ...query, verified: false }, { verified: true });

      return {
        payload: { verified: true },
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FailureVerifying,
            stack: error.stack,
            details: error,
          });
    }
  };
}
