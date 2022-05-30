import express, { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import morgan from 'morgan';
import { authRoute } from './routes';
import { connectDB } from './helpers';
import { CONFIG } from './config/config';

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute)

app.get('/', (req: Request, res: Response) => {
    return res.json({
        success: true,
        version: '1.1.2',
    });
});

app.post('/api/data', (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
});

app.use(async (req: Request, res: Response, next) => {
    next(new NotFound('This route does not exist!'));
});

app.use((err: any, req: Request, res: Response, next: any) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(CONFIG.PORT, () => {
    console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});