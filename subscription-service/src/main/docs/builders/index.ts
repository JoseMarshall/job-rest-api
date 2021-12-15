import { TimeStamps } from '../enums';
import {
  MakeArraySchema,
  MakeGeneralResponseBodySchema,
  MakeIntegerSchema,
  MakeObjectSchema,
  MakePathParamSchema,
  MakeQueryParamSchema,
  MakeRequestBodySchema,
  MakeStringSchema,
} from './builders-protocols';

export const makeStringSchema: MakeStringSchema = data => ({
  ...data,
  type: 'string',
});

export const makeArraySchema: MakeArraySchema = items => ({
  ...items,
  type: 'array',
});

export const makeObjectSchema: MakeObjectSchema = data => ({
  ...data,
  type: 'object',
});

export const makeIntegerSchema: MakeIntegerSchema = data => ({
  ...data,
  type: 'integer',
});

export const makeQueryParamSchema: MakeQueryParamSchema = data => ({
  ...data,
  allowReserved: true,
  in: 'query',
});

export const makePathParamSchema: MakePathParamSchema = data => ({
  ...data,
  in: 'path',
});
export const makeBooleanSchema = (description = '') => ({ type: 'boolean', description });

export const getRequestBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/requestBody/${x}`,
});

export const getResponseBodySchemaRef = (x: string) => ({
  $ref: `#/schemas/responseBody/${x}`,
});

export const makeMsgBodySchema: MakeObjectSchema = payloadObjSchemaDefinition => ({
  type: 'object',
  required: ['msg', 'payload'],
  properties: {
    msg: makeStringSchema({
      description: 'The message comming from the server response',
      example: 'request done successfully',
    }),
    payload: makeObjectSchema(payloadObjSchemaDefinition),
  },
});

export const makeRequestBodySchema: MakeRequestBodySchema = (properties, required) => ({
  type: 'object',
  properties,
  required,
});

export const makeGeneralResponseBodySchema: MakeGeneralResponseBodySchema = (
  payloadProps,
  requiredFields = []
) =>
  makeMsgBodySchema({
    required: [...requiredFields, 'isDeleted', TimeStamps.CreatedAt, TimeStamps.UpdatedAt],
    properties: {
      _id: makeStringSchema({
        description: 'the unique identifier for this record on database',
        example: '0778d592-ad9f-4ed2-8c8e-ca11d6b0231d',
      }),

      isDeleted: makeBooleanSchema('Indicates if this entity is deleted'),
      [TimeStamps.CreatedAt]: makeStringSchema({
        description: 'the date this record was created on database',
        format: 'date-time',
      }),
      [TimeStamps.UpdatedAt]: makeStringSchema({
        description: 'the date this record was last updated on database',
        format: 'date-time',
      }),
      ...payloadProps,
    },
  });
