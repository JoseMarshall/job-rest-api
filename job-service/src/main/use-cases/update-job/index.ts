import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { UpdateOneJob } from '../../../validators/types/job';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function updateJobUC(uow: Promise<IUnitOfWork>) {
  return async ({ body, params }: UpdateOneJob) => {
    try {
      const jobRepo = (await uow).makeJobRepository();

      const updatedJob = await jobRepo.update(params, body);

      return {
        payload: updatedJob,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FailureUpdating,
            stack: error.stack,
            details: error,
          });
    }
  };
}
