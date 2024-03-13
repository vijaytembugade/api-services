import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';

type BufferType = {
    userId: Types.ObjectId;
};

const createToken = async (buffer: BufferType) => {
    const { userId } = buffer;
    const secret = process?.env?.JWT_TOKEN_SECRET || 'randomTokenSecret';
    return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

export default createToken;
