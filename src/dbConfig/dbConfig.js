import mongoose from "mongoose";

export async function connectDb(){
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("connected")
        })

        
        connection.on("error",()=>{
            console.log("error in connection mongodb")
            process.exit()
        })
    } catch (error) {
        console.log("error connecteing db",error)
    }
}