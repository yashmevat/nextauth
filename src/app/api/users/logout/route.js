import { connectDb } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connectDb()

export async function GET(request){
    try {
        const response = NextResponse.json({
            message:"loggedout success",
            success:true
        })

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response
    }
    catch (error) {
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
    }
}