import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import _ from 'lodash';
import { JwtHelper } from '@helpers/jwt.helper';

export class AuthMiddleware {
    static async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        // check does auth exist
        if (!authorization) {
            next(new Unauthorized())
        }

        // take access token
        const token = _.last(_.split(authorization, ' ')) as string;

        JwtHelper.verifyAccessToken(token).then(payload => {
            // add jwt payload to request
            _.set(req, 'payload', payload);
            next();
        }).catch(err => next(err));
    }
}
