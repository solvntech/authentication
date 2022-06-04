import jwt from 'jsonwebtoken';
import { CONFIG } from '@config/config';
import { InternalServerError } from 'http-errors';

export class JwtHelper {
    static signAccessToken(userId: string) {
        return new Promise((resolve, reject) => {
            const payload = { userId };
            const options: jwt.SignOptions = {
                expiresIn: 60,
                audience: userId,
            };

            jwt.sign(payload, CONFIG.ACCESS_TOKEN_SECRET, options, (err, token) => {
                if (err) {
                    console.error(err);
                    reject(new InternalServerError());
                }
                resolve(token);
            });
        });
    }
}
