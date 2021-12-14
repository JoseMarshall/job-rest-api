import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { GetOneJob } from '../../../validators/types/job';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function getOneJobUC(uow: Promise<IUnitOfWork>) {
  return async (query: GetOneJob) => {
    try {
      const jobRepo = (await uow).makeJobRepository();
      const job = await jobRepo.get(query, {});

      return {
        payload: job,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 404,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.EntityNotFound,
            stack: error.stack,
            details: error,
          });
    }
  };
}
