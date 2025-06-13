import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ApiError from './ApiError.js';
import { asyncHandler } from './AsyncHandler.js';

dotenv.config();

// 1. Transporter Setup
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// 2. Verify SMTP configuration at startup (optional but helpful)
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Email transporter config error:", error);
    } else {
        console.log("✅ Email transporter is ready.");
    }
});

// 3. Send Email Function
const sendEmail = asyncHandler(async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Air University Lost & Found" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.messageId);
    } catch (err) {
        console.error("❌ Error sending email:", err);
        throw new ApiError(500, "Failed to send email");
    }
});

export { sendEmail };
