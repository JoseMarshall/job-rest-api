import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import { getResponseBodySchemaRef, makePathParamSchema } from '../../builders';
import { customError, joiValidationError } from '../../components';
import { Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const getOneJob = {
  get: {
    tags: [Tags.Jobs],
    summary: 'end-point to get one job',
    parameters: [
      makePathParamSchema({
        name: 'id',
        type: 'string',
        description: 'The unique identifier of this job in database',
        example: 'f37226ad-f294-49b6-ac6d-5fd18995220a',
        required: true,
      }),
    ],
    responses: {
      200: {
        description: ApiMessages.FoundSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('getOneJob'),
          },
        },
      },
      404: customError({
        description: ApiMessages.EntityNotFound,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 404,
      }),
      422: joiValidationError(),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};