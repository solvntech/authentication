import express, { NextFunction, Request, Response } from 'express';
import { BadRequest, Conflict } from 'http-errors';
import { User } from '../../models';

const router = express.Router();

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new BadRequest());
        }

        const isExisted = await User.findOne({ email });

        if (isExisted) {
            return next(new Conflict(`${email} is already been registered`));
        }

        const user = new User({ email, password });

        res.send(await user.save());
    } catch (e) {
        next(e);
    }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Login route');
});

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Refresh token route');
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Logout route');
});

export default router;
