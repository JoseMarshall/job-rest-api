/* eslint-disable no-await-in-loop */
import { IJob } from '../../../entities/job/job.types';
import { ISubscription } from '../../../entities/subscription/subscription.types';
import { sendNewJobOfferEmail } from '../../external/email';
import { MakeGetAllEntitiesDependencies } from '../../external/repositories/mongodb/mongoose.types';
import { IUnitOfWork } from '../../external/repositories/repository.types';
import { Message } from '../message-consumer.types';

interface EmailConfirmationDependencies {
  uow: Promise<IUnitOfWork>;
}

// eslint-disable-next-line import/prefer-default-export
export function notifyNewJobOfferUC({ uow }: EmailConfirmationDependencies) {
  return async (message: Message) => {
    const subscriptionRepo = (await uow).makeSubscriptionRepository();
    const job: IJob = JSON.parse(message.content.toString());
    let page = 1;
    const limit = 100;
    let subscriptions;

    do {
      subscriptions = await subscriptionRepo.getAll<MakeGetAllEntitiesDependencies<ISubscription>>(
        { page, limit, verified: true },
        {
          projection: { email: 1, id: 1, name: 1 },
        }
      );

      await Promise.all(
        subscriptions.data.flatMap(subscription => [
          sendNewJobOfferEmail({
            to: subscription.email,
            job,
            subscriptionId: subscription.id,
            name: subscription.name,
          }),
        ])
      );

      page += 1;
    } while (subscriptions.count - page * limit > 0);
  };
}
