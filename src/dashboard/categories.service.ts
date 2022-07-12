import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Category} from "./categories.model";
import {Item} from "./items.model";

@Injectable()
export class CategoriesService {
    constructor(@InjectModel('category') private readonly categoryModel: Model<Category>) {}
    async insertCategory(name: string, items: Array<Item>, createdBy: string) {
        const newCategory = new this.categoryModel({
            name,
            items,
            createdBy,
        });
        await newCategory.save();
        return newCategory;
    }

    async getCategoryByUser(createdBy: string): Promise<Category[]> {
        const CategoriesData = await this.categoryModel.find({
            'createdBy' : createdBy
        });
        if (!CategoriesData || CategoriesData.length == 0) {
            throw new NotFoundException('Categories data not found!');
        }
        return CategoriesData;
    }


    async getCategoryById(name: string) {
        const category = await this.categoryModel.find({
            'name' : name
        });
        if(!category || category.length == 0){
            throw new NotFoundException(`Category#${name} not found`);
        }
        return category;
        
    }

    

    async updateCategory(categoryId: string, updatedCategory: Category): Promise<Category> {
        const category = await this.categoryModel.findByIdAndUpdate(categoryId, updatedCategory, { new: true });
        if (!category ) {
            throw new NotFoundException(`Category#${categoryId} not found`);
        }
        return category;
    }

    async deleteCategory(categoryId: string): Promise<Category> {
        const category = await this.categoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            throw new NotFoundException(`Category #${categoryId} not found`);
        }
        return category;
    }
}
