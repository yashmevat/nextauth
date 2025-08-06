import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    await connectDb();
    const { token, password } = await request.json();

    const users = await User.find({ resetPasswordExpiry: { $gt: Date.now() } });
    let matchedUser = null;

    for (const u of users) {
      const isMatch = await bcryptjs.compare(u._id.toString(), token);
      if (isMatch) {
        matchedUser = u;
        break;
      }
    }

    if (!matchedUser) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    matchedUser.password = hashedPassword;
    matchedUser.resetPasswordToken = undefined;
    matchedUser.resetPasswordExpiry = undefined;
    await matchedUser.save();

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
