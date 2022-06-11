import { NextFunction, Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { ResponseHelper } from '@helpers/response.helper';

export class ErrorHandlerMiddleware {
    static async routingNotFound(req: Request, res: Response, next: NextFunction) {
        next(new NotFound('This route does not exist!'));
    }

    static async catchError(err: any, req: Request, res: Response, next: NextFunction) {
        const status = err.status || 500;
        res.status(status);
        res.send(ResponseHelper.ERROR(status, { message: err.message }));
    }
}
