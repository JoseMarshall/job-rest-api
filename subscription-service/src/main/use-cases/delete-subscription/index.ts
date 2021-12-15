import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { Unsubscribe } from '../../../validators/types/subscription';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function deleteSubscriptionUC(uow: Promise<IUnitOfWork>) {
  return async (query: Unsubscribe) => {
    try {
      const subscriptionRepo = (await uow).makeSubscriptionRepository();
      const unsubscribed = await subscriptionRepo.remove(query);

      return {
        payload: unsubscribed,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FailureDeleting,
            stack: error.stack,
            details: error,
          });
    }
  };
}
