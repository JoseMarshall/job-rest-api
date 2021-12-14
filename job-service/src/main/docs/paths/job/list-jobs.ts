import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../../../constants';
import {
  getResponseBodySchemaRef,
  makeGetAllParameters,
  makeQueryParamSchema,
} from '../../builders';
import { customError, joiValidationError } from '../../components';
import { Tags } from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const listJobs = {
  get: {
    tags: [Tags.Jobs],
    summary: 'end-point to fetch all jobs',
    parameters: [
      ...makeGetAllParameters(),
      makeQueryParamSchema({
        name: 'title',
        type: 'string',
        description:
          'Filter the jobs by its title. Obs.: Its NOT case sensitive, the result will be those jobs with the title that contains the specified value',
        required: false,
        example: 'Backend Developer',
      }),
      makeQueryParamSchema({
        name: 'company-name',
        type: 'string',
        description:
          'Filter the jobs by its company name. Obs.: Its NOT case sensitive, the result will be those jobs with the company name that contains the specified value',
        required: false,
        example: 'taikai',
      }),
      makeQueryParamSchema({
        name: 'company-market',
        type: 'string',
        description:
          'Filter the jobs by its company market. Obs.: Its NOT case sensitive, the result will be those jobs with the company market that contains the specified value',
        required: false,
        example: 'healthcare',
      }),
      makeQueryParamSchema({
        name: 'skills',
        type: 'string',
        description:
          'Filter the jobs by its required skills. Obs.: Its NOT case sensitive, the result will be those jobs with the skills that contains one of the specified value',
        required: false,
        example: 'nodejs,reactjs',
      }),
      makeQueryParamSchema({
        name: 'type',
        type: 'string',
        description:
          'Filter the jobs by its type. Obs.: Its NOT case sensitive, the result will be those jobs with the type that contains the specified value',
        required: false,
        example: 'Backend Developer',
      }),
      makeQueryParamSchema({
        name: 'planet',
        type: 'string',
        description:
          'Filter the jobs by its planet location. Obs.: Its NOT case sensitive, the result will be those jobs with the planet location that contains the specified value',
        required: false,
        example: 'mars',
      }),
      makeQueryParamSchema({
        name: 'country',
        type: 'string',
        description:
          'Filter the jobs by its country location. Obs.: Its NOT case sensitive, the result will be those jobs with the country location that contains the specified value',
        required: false,
        example: 'Iglop',
      }),
      makeQueryParamSchema({
        name: 'city',
        type: 'string',
        description:
          'Filter the jobs by its city location. Obs.: Its NOT case sensitive, the result will be those jobs with the city location that contains the specified value',
        required: false,
        example: 'XX-3',
      }),
    ],
    responses: {
      200: {
        description: ApiMessages.FoundSuccessfully,
        content: {
          'application/json': {
            schema: getResponseBodySchemaRef('listJobs'),
          },
        },
      },
      400: customError({
        description: ApiMessages.RequestProcessedError,
        name: ApiErrorsName.GenericName,
        type: ApiErrorsType.GenericType,
        code: 400,
      }),
      422: joiValidationError(),
      500: customError({ description: ApiMessages.InternalError }),
    },
  },
};
