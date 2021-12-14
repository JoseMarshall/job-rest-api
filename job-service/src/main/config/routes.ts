import { Express, NextFunction, Request, Response } from 'express';

import { ApiErrorsName, ApiErrorsType, ApiMessages } from '../../constants';
import CustomError from '../../utils/custom-error';
import { makeMsgBody } from '../adapters/express-route-adapter';
import jobRoutes from '../routes/jobs';
import handleInvalidRoute from './handle-invalid-route';

export default async (app: Express): Promise<void> => {
  app.use('/api/v1/jobs', jobRoutes);

  handleInvalidRoute(app);

  /**
   * Global error handler, handles all generic errors
   */
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
    res.status(500).json(
      makeMsgBody(ApiMessages.InternalError, {
        error: new CustomError({
          statusCode: 500,
          name: ApiErrorsName.GenericName,
          type: ApiErrorsType.GenericType,
          message: err.message,
          stack: err.stack ?? '',
          details: { ...err },
        }),
      })
    )
  );
};
