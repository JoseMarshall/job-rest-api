import { Tags } from './enums';
import { createSubscription, deleteSubscription, verifySubscription } from './paths/subscription';
import { createSubscriptionRequestBodySchema } from './schemas/request-body';
import {
  createSubscriptionResponseBodySchema,
  deleteSubscriptionResponseBodySchema,
  verifySubscriptionResponseBodySchema,
} from './schemas/response-body';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Subscription-Service',
    description:
      'Endpoints for email subscription, last updated at 2021-12-14 16:30 by JoseM@rshall PD',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  tags: [
    {
      name: Tags.Subscription,
    },
  ],

  paths: {
    '/api/v1/subscriptions': createSubscription,
    '/api/v1/subscriptions/{id}/verify': verifySubscription,
    '/api/v1/subscriptions/{id}/cancel': deleteSubscription,
  },

  schemas: {
    requestBody: {
      createSubscription: createSubscriptionRequestBodySchema,
    },
    responseBody: {
      createSubscription: createSubscriptionResponseBodySchema,
      verifySubscription: verifySubscriptionResponseBodySchema,
      deleteSubscription: deleteSubscriptionResponseBodySchema,
    },
  },
};
