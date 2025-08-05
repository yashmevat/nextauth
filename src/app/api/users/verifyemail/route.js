
import { connectDb } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";


connectDb()

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token)
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})

        if(!user){
            return NextResponse.json({error:"invalid token"},{status:400})
        }

        console.log(user)

        user.isVerified=true
        user.verifyToken=undefined
        user.verifyTokenExpiry=undefined

        await user.save()

        return NextResponse.json({message:"email verified success"},{status:200},)

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}