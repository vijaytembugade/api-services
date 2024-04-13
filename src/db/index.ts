import mongoose from 'mongoose';
import { DB } from '../constant';
import { colorErr, colorSuccess } from '@utils/colorCli';

/**
 * Connects to the MongoDB database using the provided MONGO_URI environment variable.
 *
 * @returns {Promise<boolean>} Returns a promise that resolves to true if the connection is successful.
 * @throws {Error} Throws an error if the MONGO_URI environment variable is not available.
 */
async function connectDB() {
    try {
        if (process?.env?.MONGO_URI) {
            const connectionInstance = await mongoose.connect(
                `${process.env.MONGO_URI}/${DB.DB_NAME}`
            );
            console.log(
                colorSuccess('connected to database'),
                connectionInstance?.connection?.host
            );
            return true;
        }
        throw Error(
            colorErr('MONGO_URL is not available in environment variables')
        );
    } catch (error) {
        console.log(error);
        console.log(colorErr(`Error: ${error}`));
        process.exit(0);
    }
}

export default connectDB;
