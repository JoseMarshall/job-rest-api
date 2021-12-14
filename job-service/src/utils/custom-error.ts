import { ApiErrorsName, ApiErrorsStatusCode, ApiErrorsType } from '../constants/errors';

export interface ICustomError {
  /**
   * The Http status code, for this response.
   */
  statusCode: ApiErrorsStatusCode;
  /**
   * The name of the error, eg.: DUPLICATE_KEY; MISSING_FIELDS ...
   */
  name: ApiErrorsName;
  /**
   * The type of this error, eg.: VALIDATION_ERROR; AUTHORIZATION_ERROR ...
   */
  type: ApiErrorsType;
  /**
   * The message of this error
   */
  message: string;

  /**
   * The hierarchy of dir/file names where this error occurred
   */
  stack: string;
  /**
   * Details will be an object with unknown properties
   */
  details: Record<string, unknown>;
}

class CustomError extends Error implements ICustomError {
  statusCode: ApiErrorsStatusCode;

  name: ApiErrorsName;

  type: ApiErrorsType;

  message: string;

  stack: string;

  details: Record<string, unknown>;

  constructor(props: ICustomError) {
    super(props.message);
    this.statusCode = props.statusCode;
    this.name = props.name;
    this.type = props.type;
    this.message = props.message;
    this.stack = props.stack;
    this.details = props.details;
  }
}

export default CustomError;
