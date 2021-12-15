import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import {
  getRequestBodySchemaRef,
  getResponseBodySchemaRef,
  makePathParamSchema,
} from '../../builders';
import { customError } from '../../components';
import { Tags } from '../../enums';
import { customErrorSchema } from '../../schemas/errors';

// eslint-disable-next-line import/prefer-default-export
export const updateJob = {
  patch: {
    tags: [Tags.Jobs],
    summary: 'end-point to update a job',
    parameters: [
      makePathParamSchema({
        name: 'id',
        type: 'string',
        description: 'The unique identifier of this job in database',
        example: 'f37226ad-f294-49b6-ac6d-5fd18995220a',
        required: true,
      }),
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: getRequestBodySchemaRef('updateJob'),
        },
      },
    },
    responses: {
      200: {
        description: ApiMessages.UpdatedSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('updateJob'),
          },
        },
      },
      422: customError(
        {
          description: ApiMessages.FailureUpdating,
          name: ApiErrorsName.ResourceNotFound,
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
