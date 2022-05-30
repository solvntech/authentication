import mongoose from 'mongoose';
import { CONFIG } from '../config/config';

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})

export const connectDB = () => {
    mongoose
        .connect(CONFIG.MONGODB_URI, { dbName: CONFIG.DB_NAME })
        .then(() => console.log('Mongodb connected'))
        .catch((err) => console.log(err.message));
};
