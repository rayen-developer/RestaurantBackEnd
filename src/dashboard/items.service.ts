import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Item} from "./items.model";
import {Category} from "./categories.model";

@Injectable()
export class ItemsService {
    constructor(@InjectModel('item') private readonly itemModel: Model<Item>) {}
    async insertItem(name: string, price: string, description: string,categoryId: string) {
        const newItem = new this.itemModel({
            name,
            price,
            description,
            categoryId,
        });
        await newItem.save();
        return newItem;
    }

    async getItemsByCategory(categoryId:string): Promise<Item[]> {
        const ItemsData = await this.itemModel.find({
            'categoryId' : categoryId
        });
        if (!ItemsData || ItemsData.length == 0) {
            throw new NotFoundException('Items data not found!');
        }
        return ItemsData;
    }

    async getItem(itemId: string): Promise<Item> {
        const item = await this.itemModel.findById(itemId).exec();
        if (!item) {
            throw new NotFoundException(`Item #${itemId} not found`);
        }
        return item;
    }

    async updateItem(itemId: string, updatedItem: Item): Promise<Item> {
        const item = await this.itemModel.findByIdAndUpdate(itemId, updatedItem, { new: true });
        if (!item) {
            throw new NotFoundException(`Item#${itemId} not found`);
        }
        return item;
    }

    async deleteItem(itemId: string): Promise<Item> {
        const item = await this.itemModel.findByIdAndDelete(itemId);
        if (!item) {
            throw new NotFoundException(`Item #${itemId} not found`);
        }
        return item;
    }
}
