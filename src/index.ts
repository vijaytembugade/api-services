// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { colorErr, colorInfo, colorSuccess } from '@utils/colorCli';
import { replaceTscAliasPaths } from 'tsc-alias';
import app from './app';
import connectDB from './db';
import { connectRedis } from '@service/redis';

replaceTscAliasPaths();

const server = async () => {
    try {
        const isConnected = await connectDB();
        if (isConnected) {
            app.listen(process.env.PORT || 8000, () => {
                console.log(
                    colorInfo(
                        `APIs are running on port ${process.env.PORT || 8000}`
                    )
                );
                console.log(
                    colorSuccess(`See on http://localhost:${process.env.PORT}`)
                );
            });
            return;
        }
        throw Error('DATABASE is not connected');
    } catch (err) {
        console.log(colorErr(err));
    }
};

connectRedis();
server();
