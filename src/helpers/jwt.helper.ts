import jwt from 'jsonwebtoken';
import { CONFIG } from '@config/config';
import { InternalServerError, Unauthorized } from 'http-errors';

export class JwtHelper {
    static signAccessToken(userId: string, email: string) {
        return new Promise((resolve, reject) => {
            const payload = { userId, email };
            const options: jwt.SignOptions = {
                expiresIn: '60s',
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

    static async verifyAccessToken(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    console.log(err.name);
                    const msg = err.name === 'SyntaxError' ? 'SyntaxToken is invalid' : err.message;
                    reject(new Unauthorized(msg));
                } else {
                    resolve(payload);
                }
            })
        })
    }
}
