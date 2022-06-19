import express from 'express';
import { AuthController } from '@controllers/auth/auth.controller';

const authRoute = express.Router();

authRoute.post('/register', AuthController.register);
authRoute.post('/login', AuthController.login);
authRoute.post('/refresh-token', AuthController.refreshToken);
authRoute.post('/logout', AuthController.logout);

export { authRoute };
