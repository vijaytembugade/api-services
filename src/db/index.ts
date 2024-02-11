import mongoose from "mongoose";
import { DB } from "../constant";
import {colorErr, colorSuccess} from "@utils/colorCli";

async function connectDB() {
    try {
        if (process?.env?.MONGO_URI) {
            const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB.DB_NAME}`);
            console.log(colorSuccess("connected to database"), connectionInstance.connection.host);
        }else{
            throw Error(colorErr("MONGO_URL is not available in environment variables"));
        }
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

export default connectDB;
