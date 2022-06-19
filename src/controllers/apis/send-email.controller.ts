import { NextFunction, Request, Response } from 'express';
import { EmailService } from '@services/email.service';
import * as fs from 'fs';
import * as path from 'path';

export class SendEmailController {
    static async sendSingle(req: Request, res: Response, next: NextFunction) {
        console.log(__dirname);
        fs.readFile(path.join(__dirname, '../../assets/email-template.html'), { encoding: 'utf-8' }, (err, data) => {
            EmailService.instance.send('duchai9800ttbm@gmail.com', 'abc', data, true)
        });
        res.send({
            status: 200,
        });
    }
}
