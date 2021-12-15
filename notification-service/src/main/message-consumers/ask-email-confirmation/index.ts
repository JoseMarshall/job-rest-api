import { sendConfirmSubscriptionEmail } from '../../external/email';
import { Message } from '../message-consumer.types';

interface Subscription {
  id: string;
  email: string;
  name: string;
}

// eslint-disable-next-line import/prefer-default-export
export function askForEmailConfirmationUC() {
  return async (message: Message) => {
    const subscription: Subscription = JSON.parse(message.content.toString());

    await sendConfirmSubscriptionEmail({
      name: subscription.name,
      to: subscription.email,
      subscriptionId: subscription.id,
    });
  };
}
