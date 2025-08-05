import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";
import { sendEmail2 } from "@/helpers/mailer2";

connectDb()

export async function POST(request){
    console.log("api")
    try {
        const reqBody = await request.json();
        const {username,email,password} = reqBody

        //validation to do
        console.log(reqBody)
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"},{status:400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password,salt)

       const newUser =  new User({
            username,email,password:hashedPass
        })

        const savedUser = await newUser.save()
       console.log(savedUser)

       //send verification mail
       await sendEmail2({email,emailType:"VERIFY",userId:savedUser._id})

       return NextResponse.json({
          message:"user registered successfully",
          success:true,
          savedUser
       })


    } catch (error) {
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}