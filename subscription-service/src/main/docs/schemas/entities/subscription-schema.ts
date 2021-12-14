import { makeBooleanSchema, makeObjectSchema, makeStringSchema } from '../../builders';

// eslint-disable-next-line import/prefer-default-export
export const subscriptionSchema = makeObjectSchema({
  required: ['name', 'email'],
  properties: {
    name: makeStringSchema({
      description: 'The name of the subscriptor',
      example: 'Jane Doe',
    }),
    email: makeStringSchema({
      description: 'The subscriptor email',
      example: 'john.doe@taikai.com',
      format: 'email',
    }),
    verified: makeBooleanSchema('Indicates if the subscriptor has already verified his email'),
  },
});
