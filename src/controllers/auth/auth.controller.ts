import { NextFunction, Request, Response } from 'express';
import { JoiValidatorHelper } from '@helpers/index';
import { userValidator } from '@validators/index';
import { User } from '@models/index';
import { Conflict } from 'http-errors';

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const validate = await JoiValidatorHelper.check(userValidator, req.body);

            if (!validate.isValid) {
                return next(validate.error);
            }

            const isExisted = await User.findOne({ email });

            if (isExisted) {
                return next(new Conflict(`${email} is already been registered`));
            }

            const user = new User(validate.result);

            res.send(await user.save());
        } catch (e) {
            next(e);
        }
    }
}
