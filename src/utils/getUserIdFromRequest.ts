import type { Request } from 'express';
import type { Types } from 'mongoose';
export default function getUserIdFromRequest(req: Request): Types.ObjectId {
    const userId = req?.body?.tokenInfo?.id;
    return userId;
}
