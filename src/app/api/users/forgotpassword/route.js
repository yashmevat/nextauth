import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail2 } from "@/helpers/mailer2";
export async function POST(request) {
  try {
    await connectDb();
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // const resetToken = await bcryptjs.hash(user._id.toString(), 10);

    // user.resetPasswordToken = resetToken;
    // user.resetPasswordExpiry = Date.now() + 3600000; // 1 hour
    // await user.save();

    // const resetUrl = `${process.env.DOMAIN}/resetpassword?token=${resetToken}`;

    await sendEmail2({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
