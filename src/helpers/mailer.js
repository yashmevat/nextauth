import User from "@/model/userModel";
import nodemailer from "nodemailer";
import { emailTemplate } from "./template";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
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

    // Mailtrap SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "22a1b59c09e1c2",
        pass: "09a8f9303b6a4e",
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
      from: '"Your App Name" <noreply@yourapp.com>',
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

