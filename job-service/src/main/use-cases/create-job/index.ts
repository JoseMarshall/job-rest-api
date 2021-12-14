import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../constants';
import { makeJob } from '../../../entities/job';
import { IJobInput } from '../../../entities/job/job.types';
import CustomError from '../../../utils/custom-error';
import { IUnitOfWork } from '../../external/repositories/repository.types';

// eslint-disable-next-line import/prefer-default-export
export function createJobUC(uow: IUnitOfWork) {
  return async (data: IJobInput) => {
    try {
      const jobRepo = uow.makeJobRepository();
      const createdJob = await jobRepo.add(makeJob(data));

      return {
        payload: createdJob,
      };
    } catch (error) {
      throw error instanceof CustomError
        ? error
        : new CustomError({
            statusCode: 422,
            name: ApiErrorsName.GenericName,
            type: ApiErrorsType.GenericType,
            message: ApiMessages.FailureCreating,
            stack: error.stack,
            details: error,
          });
    }
  };
}
