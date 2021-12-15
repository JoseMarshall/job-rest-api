import { Queue } from '../../constants';
import unitOfWork from '../external/repositories/mongodb/unit-of-work';
import { askForEmailConfirmationUC } from './ask-email-confirmation';
import { Consumer } from './message-consumer.types';
import { notifyNewJobOfferUC } from './notify-new-job-offer';

const consumers: ReadonlyArray<Consumer> = [
  { queue: Queue.Subscriptions, fn: askForEmailConfirmationUC() },
  { queue: Queue.Jobs, fn: notifyNewJobOfferUC({ uow: unitOfWork() }) },
];

export default consumers;
