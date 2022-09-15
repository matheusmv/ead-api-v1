import 'dotenv/config';
import 'reflect-metadata';

import { DataSource } from 'typeorm';

const dbProps: {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
} = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as number | undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export const AppDataSource = new DataSource({
    type: 'postgres',
    ...dbProps,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
