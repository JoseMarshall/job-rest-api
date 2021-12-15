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
  };

  const html = await loadTemplate(`confirm-subscription.hbs`, context);
  return send({ to, html, subject: 'Comfirm your email subscription' });
}

export async function sendNewJobOfferEmail({ to, job, subscriptionId, name }: JobOfferEmail) {
  const context = {
    linkToJob: `${process.env.JOB_SERVICE_URL ?? ''}/jobs/${job.id}`,
    cancelSubscription: `${
      process.env.SUBSCRIPTION_SERVICE_URL ?? ''
    }/subscritpions/${subscriptionId}/cancel`,
    name,
    ...job,
  };

  const html = await loadTemplate(`job-offer.hbs`, context);
  return send({ to, html, subject: 'New job offer' });
}
