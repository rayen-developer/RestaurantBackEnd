import { Module } from '@nestjs/common';
import {ItemsService} from "./items.service";
import {ItemsController} from "./items.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {ItemSchema} from "./items.model";


@Module({
    imports: [MongooseModule.forFeature([{ name: "item", schema: ItemSchema }])],
    providers: [ItemsService],
    controllers: [ItemsController],
    exports: [ItemsService],
})
export class ItemsModule {}
