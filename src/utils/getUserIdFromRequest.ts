import type { Request } from 'express';
import type { Schema } from 'mongoose';
export default function getUserIdFromRequest(
    req: Request
): Schema.Types.ObjectId {
    const userId = req?.body?.tokenInfo?.id;
    return userId;
}
