import { colorErr, colorSuccess } from '@utils/colorCli';
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from 'constant';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
});

const fileUpload = async (localFilePath: string) => {
    try {
        if (!localFilePath) {
            throw Error('Could not find the file path');
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        console.log(colorSuccess('File is uploaded!'), response?.url);

        if (process?.env?.ENV !== ENV.dev) {
            fs.unlinkSync(localFilePath);
        }
        return response;
    } catch (error) {
        console.log(colorErr(error));
        fs.unlinkSync(localFilePath); // removes the locally saved temporary file
        return;
    }
};

export default fileUpload;
