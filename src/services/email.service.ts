import nodemailer from 'nodemailer';
import { CONFIG } from '@config/config';
import Mail from 'nodemailer/lib/mailer';

export class EmailService {
    private readonly _transporter: nodemailer.Transporter;
    private static _instance: EmailService;

    private constructor() {
        this._transporter = nodemailer.createTransport({
            service: CONFIG.EMAIL_SERVICE,
            auth: {
                user: CONFIG.HOST_EMAIL,
                pass: CONFIG.HOST_PASSWORD
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    static init() {
        if (!this._instance) {
            this._instance = new EmailService();
        }
        return this._instance;
    }

    send(email: string, subject: string, content: string) {
        const emailOptions: Mail.Options = {
            from: CONFIG.HOST_EMAIL,
            to: email,
            subject: subject,
            text: content
        }
        this._transporter.sendMail(emailOptions).then((value) => {
            console.log(value);
        }, reason => {
            console.log(reason);
        })
    }
}
