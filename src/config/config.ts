require('dotenv').config();

export const CONFIG = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI as string,
    DB_NAME: process.env.DB_NAME as string,
}
