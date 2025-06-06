import nodemailer from 'nodemailer';
// import { config } from '../config.js';
import ApiError from './ApiError.js';
import { asyncHandler } from './AsyncHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


const sendEmail = asyncHandler(async (to, subject, text, html) => {
    try {
        console.log('Sending email to:', html);
        
        const mailOptions = {
            from: `"Air University Lost And Found" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            }
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new ApiError(500, 'Failed to send email');
    }
}
);

export {
    sendEmail
}