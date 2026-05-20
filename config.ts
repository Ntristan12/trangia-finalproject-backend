import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Load config.json if it exists (explicitly fallback to it in dev/prod environments)
let configJson: any = {};
try {
    const configPath = path.resolve(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
        configJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } else {
        // Also check parent directory if running from the compiled dist folder
        const parentConfigPath = path.resolve(__dirname, '../config.json');
        if (fs.existsSync(parentConfigPath)) {
            configJson = JSON.parse(fs.readFileSync(parentConfigPath, 'utf-8'));
        }
    }
} catch (error: any) {
    console.warn('Warning: Could not load config.json:', error.message);
}

const config = {
    database: {
        host: process.env.DB_HOST || configJson.database?.host || 'localhost',
        port: Number(process.env.DB_PORT) || configJson.database?.port || 3306,
        user: process.env.DB_USER || configJson.database?.user || 'root',
        password: process.env.DB_PASSWORD || configJson.database?.password || '',
        database: process.env.DB_NAME || configJson.database?.database || 'node_mysql_api_trangia'
    },
    secret: process.env.JWT_SECRET || configJson.secret || 'development-secret-change-me',
    emailFrom: process.env.EMAIL_FROM || configJson.emailFrom || 'info@my-node-api.com',
    smtpOptions: {
        host: process.env.SMTP_HOST || configJson.smtpOptions?.host || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || configJson.smtpOptions?.port || 587,
        auth: {
            user: process.env.SMTP_USER || configJson.smtpOptions?.auth?.user || '',
            pass: process.env.SMTP_PASS || configJson.smtpOptions?.auth?.pass || ''
        }
    },
    corsOrigin: process.env.CORS_ORIGIN || configJson.corsOrigin || 'http://localhost:4200'
};

export default config;

