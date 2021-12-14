import { Channel, Connection } from 'amqplib';

import { ApiErrorsName, ApiErrorsType, ApiMessages, RabbitMQ } from '../../../constants';
import { makeJob } from '../../../entities/job';
import { IJobInput } from '../../../entities/job/job.types';
import CustomError from '../../../utils/custom-error';
import { pubMessage } from '../../external/message-brokers/helpers';
import { MessageBroker } from '../../external/message-brokers/message-broker.types';
import { IUnitOfWork } from '../../external/repositories/repository.types';

interface CreateJobDependencies {
  uow: Promise<IUnitOfWork>;
  messageBroker: MessageBroker<Connection, Channel>;
}

// eslint-disable-next-line import/prefer-default-export
export function createJobUC({ uow, messageBroker }: CreateJobDependencies) {
  return async (data: IJobInput) => {
    try {
      const jobRepo = (await uow).makeJobRepository();
      const createdJob = await jobRepo.add(makeJob(data));

      await pubMessage<Connection, Channel>({
        messageBroker,
        msg: createdJob,
        queue: RabbitMQ.Jobs,
      });

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
