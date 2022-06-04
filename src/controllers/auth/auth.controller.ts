import { NextFunction, Request, Response } from 'express';
import { JoiValidatorHelper, JwtHelper } from '@helpers/index';
import { userValidator } from '@validators/index';
import { User } from '@models/index';
import { Conflict, NotFound, Unauthorized } from 'http-errors';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const validate = await JoiValidatorHelper.check(userValidator, req.body);

            if (!validate.isValid) {
                return next(validate.error);
            }

            const isExisted = await User.findOne({ email: validate.result.email });

            if (isExisted) {
                return next(new Conflict(`${validate.result.email} is already been registered`));
            }

            const user = new User(validate.result);
            const saveUser = await user.save();
            const accessToken = await JwtHelper.signAccessToken(saveUser.id, validate.result.email);

            res.send({
                id: saveUser.id,
                email: saveUser.email,
                accessToken: accessToken,
            });
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const validate = await JoiValidatorHelper.check(userValidator, req.body);

            if (!validate.isValid) {
                return next(validate.error);
            }

            // find user
            const user = await User.findOne({ email: validate.result.email });

            // user has not been created
            if (!user) {
                return next(new NotFound('User not registered'));
            }

            // check password
            const isMatch = await user.isValidPassword(validate.result.password);

            if (!isMatch) {
                return next(new Unauthorized('Username/Password is invalid'));
            }

            const accessToken = await JwtHelper.signAccessToken(user.id, validate.result.email);

            res.send({
                id: user.id,
                email: user.email,
                accessToken: accessToken,
            })
        } catch (e: any) {
            next(e);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            next(e);
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            next(e);
        }
    }
}
