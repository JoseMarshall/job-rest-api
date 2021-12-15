import { SendMailOptions } from 'nodemailer';

import { IJob } from '../../../entities/job/job.types';

export type MakeMailOptions = (data: SendMailOptions) => SendMailOptions;

export interface ConfirmSubscriptionEmail {
  to: string | string[];
  name: string;
  subscriptionId: string;
}

export interface JobOfferEmail {
  to: string | string[];
  job: IJob;
  subscriptionId: string;
  name: string;
}
