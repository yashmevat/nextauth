import User from "@/model/userModel";
import nodemailer from "nodemailer";
import { emailTemplate } from "./template";
import bcryptjs from "bcryptjs";

export const sendEmail2 = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        // Set token fields based on emailType
        const updateFields =
            emailType === "VERIFY"
                ? {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000, // 1 hour
                }
                : {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                };

        await User.findByIdAndUpdate(userId, updateFields);


        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // App Password
            },
        });



        // Compose email
        const subject = emailType === "VERIFY" ? "Verify your Email" : "Reset your Password";
        const actionUrl =
            emailType === "VERIFY"
                ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
                : `${process.env.DOMAIN}/forgotpassword?token=${hashedToken}`;

        const html = emailTemplate({
            emailTitle: subject,
            emailMessage:
                emailType === "VERIFY"
                    ? "Please verify your email to proceed further."
                    : "Please click the link below to reset your password.",
            actionLink: actionUrl,
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            html,
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (error) {
        throw new Error("Email sending failed: " + error.message);
    }
};
