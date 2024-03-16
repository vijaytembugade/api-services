import type { USER_TYPE } from "constant";
import type { Types } from "mongoose";


export interface UserType {
    _id: Types.ObjectId
    username: string,
    email: string,
    password: string,
    userType?: keyof typeof USER_TYPE,
    isAdmin?: boolean,
    avatar?: string,
    refreshToken: string,
} 