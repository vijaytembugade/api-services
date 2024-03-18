import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';

type BufferType = {
    id: Types.ObjectId;
};

const createToken = async (buffer: BufferType) => {
    const { id } = buffer;
    const secret = process?.env?.JWT_TOKEN_SECRET || 'randomTokenSecret';
    return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

export default createToken;
