import express, { NextFunction, Request, Response } from 'express';
import { AuthController } from '@controllers/auth/auth.controller';

const router = express.Router();

router.post('/register', AuthController.register);

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
