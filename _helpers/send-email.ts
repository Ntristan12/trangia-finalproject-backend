import nodemailer from 'nodemailer';
import config from '../app-config';

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    // Use Resend HTTP API if key is set (no extra package needed)
    if (process.env.RESEND_API_KEY) {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: process.env.EMAIL_FROM || from,
                to,
                subject,
                html
            })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`Resend error: ${JSON.stringify(err)}`);
        }
        return;
    }

    // Fall back to SMTP for local development
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
