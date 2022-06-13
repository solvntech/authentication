require('dotenv').config();

export const CONFIG = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI as string,
    DB_NAME: process.env.DB_NAME as string,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    EMAIL_SERVICE: process.env.EMAIL_SERVICE as string,
    HOST_EMAIL: process.env.HOST_EMAIL as string,
    HOST_PASSWORD: process.env.HOST_PASSWORD as string,
}
