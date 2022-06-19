import express from 'express';
import morgan from 'morgan';
import { authRoute, apiRoute } from '@routes/index';
import { connectDB } from '@helpers/index';
import { CONFIG } from '@config/config';
import { ErrorHandlerMiddleware } from '@middlewares/error-handler/error-handler.middleware';
import { EmailService } from '@services/index';

const app = express();

connectDB();
EmailService.init();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/api', apiRoute);

app.use(ErrorHandlerMiddleware.routingNotFound);
app.use(ErrorHandlerMiddleware.catchError);

app.listen(CONFIG.PORT, () => {
    console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
