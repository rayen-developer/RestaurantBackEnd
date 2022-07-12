import {Controller, Post, Body, Get, Param, Put, Delete, Req, NotFoundException} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {Category} from "./categories.model";
import {Item} from "./items.model";
import { Model } from 'mongoose';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}
    @Post('/')
    async addCategory(
        @Body('name') categoryName: string,
        @Body('items') categoryItems : Array<Item>,
        @Body('createdBy') createdBy : string
    ) {
        const category = await this.categoryService.insertCategory(
            categoryName,
            categoryItems,
            createdBy,
        );
        return {
            msg: 'Category successfully added',
            categoryId: category.id,
            categoryName: category.name,
            categoryItems: category.items,
            createdBy: category.createdBy
        };
    }
    @Post('/all')
    async getCategoryByUser(@Body('createdBy') createdBy : string){
        return await this.categoryService.getCategoryByUser(createdBy);
    }
    @Get('/:id')
    async getCategoryById(@Param('id') categoryId: string){
        return await this.categoryService.getCategoryById(categoryId);
    }

    
    @Put('/add')
    async addItem(@Body('name') name :string,
    @Body('itemName') itemName : string,
    @Body('price') price : string,
    @Body('description') description : string,
    ){
        const category = await this.categoryService.getCategoryById(name);
        category[0].items.push({
            "name" : itemName,
            "price": price,
            "description" : description
        });  
        const newCategory =  await this.categoryService.updateCategory(category[0].id,category[0]);
        return {
            msg: 'Item successfully added',
            categoryId: newCategory.id,
            categoryName: newCategory.name,
            categoryItems: newCategory.items,
            categoryCreatedBy: newCategory.createdBy,
        };  

    }
    @Put('/update')
    async updateCategoryName(@Body('name') oldname :string,
    @Body('newName') newname : string){
        const category = await this.categoryService.getCategoryById(oldname);
        if(!category){
            throw new NotFoundException;
        }
        category[0].name= newname;
        const newCategory = await this.categoryService.updateCategory(category[0].id,category[0]);
        return {
            msg: 'Category Name  successfully updated',
            categoryId: newCategory.id,
            categoryName: newCategory.name,
            categoryItems: newCategory.items,
            categoryCreatedBy: newCategory.createdBy,
        };  
    }

    @Put('/:id')
    async updateCategory(@Param('id') categoryId: string,
                     @Body() updatedCategory: Category) {
        const category = await this.categoryService.updateCategory(categoryId, updatedCategory);
        return {
            msg: 'category successfully updated',
            categoryId: category.id,
            categoryName: category.name,
            categoryItems: category.items,
            categoryCreatedBy: category.createdBy,
        };
    }

    @Put('/item')
    async updateItem(
        @Body('name') name:string,
         @Body('itemName') itemName: string,
         @Body('price') price: string,
         @Body('description')  description : string ){
            const category = await this.categoryService.getCategoryById(name);
            const items = category[0].items;
            const Index = items.findIndex((x) => x.name==itemName && x.price==price && x.description == description);
            if (Index > -1) {
                items.splice(Index, 1);
            }
            items.push({
                "name" : itemName,
                "price": price,
                "description" : description
            });  

            const newCategory = await this.categoryService.updateCategory(category[0].id,category[0]);
            return {
            msg: 'Item  successfully updated',
            categoryId: newCategory.id,
            categoryName: newCategory.name,
            categoryItems: newCategory.items,
            categoryCreatedBy: newCategory.createdBy,
        };  

         }

    @Delete('/item')
    async deleteItem(
         @Body('name') name:string,
         @Body('itemName') itemName: string,
         @Body('price') price: string,
         @Body('description')  description : string    
    ){
        
        
        const category= await this.categoryService.getCategoryById(name);
        const items = category[0].items;
        const Index = items.findIndex((x) => x.name==itemName && x.price==price && x.description == description);
        if (Index > -1) {
            items.splice(Index, 1);
        }
        const newCategory = await this.categoryService.updateCategory(category[0].id,category[0]);
        return {
            msg: 'Category item  successfully deleted',
            categoryId: newCategory.id,
            categoryName: newCategory.name,
            categoryItems: newCategory.items,
            categoryCreatedBy: newCategory.createdBy,
        };  


    }

    @Delete('/:id')
    async deleteCategory(@Param('id') categoryId: string)
    {

        const category = await this.categoryService.deleteCategory(categoryId);
        return {
            msg: "Category successfully deleted",
            categoryId: category.id,
            categoryName: category.name,
            categoryItems: category.items,
            categoryCreatedBy: category.createdBy,
        };
    }
}
