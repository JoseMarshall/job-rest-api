import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import { getRequestBodySchemaRef, getResponseBodySchemaRef } from '../../builders';
import { customError } from '../../components';
import { Tags } from '../../enums';
import { customErrorSchema } from '../../schemas/errors';

// eslint-disable-next-line import/prefer-default-export
export const createJob = {
  post: {
    tags: [Tags.Jobs],
    summary: 'end-point to create a job',
    requestBody: {
      content: {
        'application/json': {
          schema: getRequestBodySchemaRef('createJob'),
        },
      },
    },
    responses: {
      201: {
        description: ApiMessages.CreatedSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('createJob'),
          },
        },
      },
      400: customError({
        description: ApiMessages.FailureCreating,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 404,
      }),
      422: customError(
        {
          description: ApiMessages.FailureCreating,
          name: ApiErrorsName.GenericName,
          type: ApiErrorsType.GenericType,
          code: 422,
        },
        [
          customErrorSchema({
            description: ApiMessages.NoMatchedSchema,
            name: ApiErrorsName.NoMatchedSchema,
            type: ApiErrorsType.ValidationError,
            code: 422,
          }),
        ]
      ),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};
