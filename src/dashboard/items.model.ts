import mongoose from "mongoose";

export const ItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        categoryId:{
            type: String,
            required : true,
        }

    },
)

export interface Item extends mongoose.Document {
    _id: string;
    name: string;
    price: string;
    description: string;
    categoryId : string;
}