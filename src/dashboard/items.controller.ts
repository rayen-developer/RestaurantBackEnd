import {Controller, Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import {ItemsService} from "./items.service";
import {Item} from "./items.model";

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}
    @Post('/')
    async addItem(
        @Body('name') itemName: string,
        @Body('price') itemPrice: string,
        @Body('description') itemDescription: string,
        @Body('categoryId') categoryId: string
    ) {
        const item = await this.itemService.insertItem(
            itemName,
            itemPrice,
            itemDescription,
            categoryId,
        );
        return {
            msg: 'Item successfully added',
            itemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemDescription: item.description,
            categoryId: item.categoryId,

        };
    }
    @Post('/get')
    async getItems(@Body('id')categoryId:string){
        return await this.itemService.getItemsByCategory(categoryId);
    }
    @Get('/:id')
    async getItem(@Param('id') itemId: string){
        return await this.itemService.getItem(itemId);
    }

    @Put('/:id')
    async updateItem(@Param('id') itemId: string,
                        @Body() updatedItem: Item) {
        const item = await this.itemService.updateItem(itemId, updatedItem);
        return {
            msg: 'Item successfully updated',
            itemId: item.id,
            itemName: item.name,
            itemPrice: item.price,
            itemDescription: item.description,
            categoryId: item.categoryId,
        };
    }
    @Delete('/:id')
    async deleteItem(@Param('id') itemId: string)
    {

            const item = await this.itemService.deleteItem(itemId);
            return {
                msg: "Item successfully deleted",
                itemId: item.id,
                itemName: item.name,
                itemPrice: item.price,
                itemDescription: item.description,
                categoryId : item.categoryId,
            };
    }


}
