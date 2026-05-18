import dotenv from 'dotenv';
dotenv.config();

const config = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'node_mysql_api_trangia'
    },
    secret: process.env.JWT_SECRET || 'development-secret-change-me',
    emailFrom: process.env.EMAIL_FROM || 'info@my-node-api.com',
    smtpOptions: {
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
            user: process.env.SMTP_USER || '',
            pass: process.env.SMTP_PASS || ''
        }
    },
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200'
};

export default config;
