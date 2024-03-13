import { colorInfo } from '@utils/colorCli';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

let redisClient: RedisClientType;

const connectRedis = async () => {
    redisClient = createClient({
        url: process.env.REDIS_CLIENT_URL,
    });
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    console.log(colorInfo('Redis client is connected'));
};

export { connectRedis, redisClient };
