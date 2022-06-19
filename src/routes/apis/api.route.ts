import express, { Request, Response } from 'express';
import { SendEmailController } from '@controllers/apis';

const apiRoute = express.Router();

apiRoute.post('/send-email', SendEmailController.sendSingle);

apiRoute.post('/data', (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

export { apiRoute };
