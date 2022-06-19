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
            console.log('Init email service');
            this._instance = new EmailService();
        }
        return this._instance;
    }

    static get instance() {
        return this._instance;
    }

    async send(email: string, subject: string, content: string, isHTML: boolean = false) {
        const emailOptions: Mail.Options = {
            from: CONFIG.HOST_EMAIL,
            to: email,
            subject: subject,
        }

        if (isHTML) {
            emailOptions.html = content;
        } else {
            emailOptions.text = content;
        }

        console.log(emailOptions);

        return await this._transporter.sendMail(emailOptions).then((value) => {
            console.log(value);
            return true;
        }, reason => {
            console.log(reason);
            return false;
        })
    }
}
