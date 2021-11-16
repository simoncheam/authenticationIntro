import * as dotenv from 'dotenv';

dotenv.config();

export const sql_stuffs = {

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA

};

export const jwt_stuffs = {

    secret: process.env.JWT_SECRET,
    signature: process.env.JWT_SIGNATURE,
    expiration: process.env.JWT_EXPIRATION

};

export default { jwt_stuffs, sql_stuffs };