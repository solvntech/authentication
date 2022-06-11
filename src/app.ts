import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { authRoute } from '@routes/index';
import { connectDB } from '@helpers/index';
import { CONFIG } from '@config/config';
import { AuthMiddleware } from '@middlewares/auth/auth.middleware';
import _ from 'lodash';
import { ErrorHandlerMiddleware } from '@middlewares/error-handler/error-handler.middleware';

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);

app.get('/', AuthMiddleware.verifyAccessToken, async (req: Request, res: Response, next) => {
    console.log(_.get(req, 'payload'));
    return res.json({
        success: true,
        version: '1.1.2',
    });
});

app.post('/api/data', (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

app.use(ErrorHandlerMiddleware.routingNotFound);
app.use(ErrorHandlerMiddleware.catchError);

app.listen(CONFIG.PORT, () => {
    console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
