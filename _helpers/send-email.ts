import nodemailer from 'nodemailer';
import config from '../app-config';

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || config.smtpOptions.host,
        port: Number(process.env.SMTP_PORT) || config.smtpOptions.port,
        auth: {
            user: process.env.SMTP_USER || config.smtpOptions.auth.user,
            pass: process.env.SMTP_PASS || config.smtpOptions.auth.pass,
        }
    });
    await transporter.sendMail({ from, to, subject, html });
}