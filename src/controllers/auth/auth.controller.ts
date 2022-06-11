import { NextFunction, Request, Response } from 'express';
import { JoiValidatorHelper, JwtHelper, ResponseHelper } from '@helpers/index';
import { userValidator } from '@validators/index';
import { User } from '@models/index';
import { BadRequest, Conflict, NotFound, Unauthorized } from 'http-errors';

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

            res.send(
                ResponseHelper.OK({
                    id: saveUser.id,
                    email: saveUser.email,
                })
            );
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
            const refreshToken = await JwtHelper.signRefreshToken(user.id);

            res.send(
                ResponseHelper.OK({
                    id: user.id,
                    email: user.email,
                    accessToken,
                    refreshToken,
                })
            );
        } catch (e: any) {
            next(e);
        }
    }

    static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                next(new BadRequest());
            }
            const userId = await JwtHelper.verifyRefreshToken(refreshToken) as string;
            const token = await JwtHelper.signRefreshToken(userId);
            res.send(
                ResponseHelper.OK({
                    id: userId,
                    refreshToken: token,
                })
            );
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
