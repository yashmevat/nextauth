import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({success:false, message: "User does not exist" }, { status: 200 });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return NextResponse.json({ success:false,message: "Email not verified. Please verify before login." }, { status: 200 });
    }

    // Compare password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ success:false,message: "Invalid credentials" }, { status: 400 });
    }

    // Create JWT payload
    const tokenPayload = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    // Sign token
    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    // Set token in cookie
    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/", // ensure cookie is available to all routes
    });

    return response;

  } catch (error) {
    return NextResponse.json({
      success:false,
      error: error.message || "Internal Server Error",
    },{status: 500});
  }
}
