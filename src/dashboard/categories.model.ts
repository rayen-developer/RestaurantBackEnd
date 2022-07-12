import * as mongoose from "mongoose";
import {Item} from "./items.model";
import {Schema, Types} from "mongoose";
import {User, UserSchema} from "../users/users.model";


export const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique:true,
        },
        items : {
            type: Array,
        },
        createdBy: {
            type: String,
        }

    },
)


export interface Category extends mongoose.Document {
    _id: string;
    name: string;
    items: Array<any>;
    createdBy : string;
}




