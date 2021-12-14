import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import CustomError from '../../../utils/custom-error';
import { DeleteOneJob } from '../../../validators/types/job';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function deleteJobUC(uow: IUnitOfWork) {
  return async (query: DeleteOneJob) => {
    try {
      const jobRepo = uow.makeJobRepository();
      const deletedJob = await jobRepo.remove(query);

      return {
        payload: deletedJob,
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
