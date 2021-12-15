import { ConfirmSubscriptionEmail, JobOfferEmail } from './email.types';
import { loadTemplate } from './helpers';
import send from './send';

export async function sendConfirmSubscriptionEmail({
  name,
  to,
  subscriptionId,
}: ConfirmSubscriptionEmail) {
  const context = {
    verifySubscription: `${
      process.env.SUBSCRIPTION_SERVICE_URL ?? ''
    }/subscritpions/${subscriptionId}/verify`,
    name,
    subscriptionId,
  };

  const html = await loadTemplate(`confirm-subscription.hbs`, context);
  return send({ to, html, subject: 'Email Confirmation' });
}

export async function sendNewJobOfferEmail({ to, job, subscriptionId }: JobOfferEmail) {
  const context = {
    linkToJob: `${process.env.JOB_SERVICE_URL ?? ''}/jobs/${job.id}`,
    cancelSubscription: `${
      process.env.SUBSCRIPTION_SERVICE_URL ?? ''
    }/subscritpions/${subscriptionId}/cancel`,
    ...job,
  };

  const html = await loadTemplate(`job-offer.hbs`, context);
  return send({ to, html, subject: 'New Job offer' });
}
