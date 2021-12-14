import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import { IJob } from '../../../entities/job/job.types';
import CustomError from '../../../utils/custom-error';
import { GetAllJobs } from '../../../validators/types/job';
import { formatQueryToRegex } from '../../external/repositories/mongodb/helpers';
import { MakeGetAllEntitiesDependencies } from '../../external/repositories/mongodb/mongoose.types';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function listJobsUC(uow: IUnitOfWork) {
  return async (query: GetAllJobs) => {
    try {
      const jobRepo = uow.makeJobRepository();
      const jobsList = await jobRepo.getAll<MakeGetAllEntitiesDependencies<IJob>>(query, {
        formatQuery: formatQueryToRegex,
      });

      return {
        payload: jobsList,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 400,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.RequestProcessedError,
            stack: error.stack,
            details: error,
          });
    }
  };
}
