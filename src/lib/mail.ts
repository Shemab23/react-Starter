import nodemailer from "nodemailer";
import { isDev } from "../config/env.js";

/**
 * A single configured transport, reused everywhere an email needs to be sent.
 * In development, falls back to a JSON transport that logs instead of sending,
 * so the app runs without real SMTP credentials configured.
 */
export const mailTransport = isDev
  ? nodemailer.createTransport({ jsonTransport: true })
  : nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

export async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  await mailTransport.sendMail({
    from: process.env.MAIL_FROM ?? "no-reply@example.com",
    ...options,
  });
}
