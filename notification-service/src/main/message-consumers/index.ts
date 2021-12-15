import { Queue } from '../../constants';
import unitOfWork from '../external/repositories/mongodb/unit-of-work';
import { askForEmailConfirmationUC } from './ask-email-confirmation';
import { notifyNewJobOfferUC } from './notify-new-job-offer';

export interface Message {
  content: string;
}

export interface Consumer {
  queue: string;
  fn: (message: Message) => Promise<void>;
}
const consumers: ReadonlyArray<Consumer> = [
  { queue: Queue.Subscriptions, fn: askForEmailConfirmationUC() },
  { queue: Queue.Jobs, fn: notifyNewJobOfferUC({ uow: unitOfWork() }) },
];

export default consumers;
