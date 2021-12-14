import { Channel, Connection } from 'amqplib';

import { ApiErrorsName, ApiErrorsType, ApiMessages, RabbitMQ } from '../../../constants';
import { makeSubscription } from '../../../entities/subscription';
import { ISubscriptionInput } from '../../../entities/subscription/subscription.types';
import CustomError from '../../../utils/custom-error';
import { MessageBroker } from '../../external/message-brokers/message-broker.types';
import { pubMessage } from '../../external/message-brokers/helpers';

import { IUnitOfWork } from '../../external/repositories/repository.types';

interface CreateSubscriptionDependencies {
  uow: Promise<IUnitOfWork>;
  messageBroker: MessageBroker<Connection, Channel>;
}

// eslint-disable-next-line import/prefer-default-export
export function createSubscriptionUC({ uow, messageBroker }: CreateSubscriptionDependencies) {
  return async (data: ISubscriptionInput) => {
    try {
      const subscriptionRepo = (await uow).makeSubscriptionRepository();
      const createdSubscription = await subscriptionRepo.add(makeSubscription(data));

      await pubMessage<Connection, Channel>({
        messageBroker,
        msg: createdSubscription,
        queue: RabbitMQ.Subscriptions,
      });

      return {
        payload: createdSubscription,
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
