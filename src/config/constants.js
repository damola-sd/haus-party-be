import dotenv from 'dotenv';
dotenv.config();
export const {
    MODE, DEV_DB_URL, TEST_DB_URL, STAGE_DB_URL, PROD_DB_URL
} = process.env;