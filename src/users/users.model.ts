import * as mongoose from "mongoose"
import {Category} from "../dashboard/categories.model";
export const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },

)

export interface User extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
}