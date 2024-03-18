import { colorErr, colorInfo } from '@utils/colorCli';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

let redisClient: RedisClientType | null;

const connectRedis = async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_CLIENT_URL,
        });
        redisClient.on('error', (err) => {
            throw new Error('Redis Connection failed', err);
        });
        await redisClient.connect();
        console.log(colorInfo('Redis client is connected'));
    } catch (err) {
        console.log(colorErr(err));
        redisClient = null;
    }
};

export { connectRedis, redisClient };
