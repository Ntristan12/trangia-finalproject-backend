import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import config from '../app-config';

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: process.env.EMAIL_FROM || from,
            to,
            subject,
            html
        });
        if (error) throw new Error(`Resend error: ${error.message}`);
        return;
    }

    const user = process.env.SMTP_USER || config.smtpOptions.auth.user;
    const pass = process.env.SMTP_PASS || config.smtpOptions.auth.pass;

    if (!user || !pass) {
        console.log(`[sendEmail] No email provider configured — skipping email to ${to}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || config.smtpOptions.host,
        port: Number(process.env.SMTP_PORT) || config.smtpOptions.port,
        auth: { user, pass }
    });

    await transporter.sendMail({ from, to, subject, html });
}
