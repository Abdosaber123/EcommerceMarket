import { AbstractRepository } from "@Model/AbstractRipository";
import { Category } from "./Category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class CategoryRipo extends AbstractRepository<Category>{
    constructor(@InjectModel(Category.name) categoryModel:Model<Category>  ){
        super(categoryModel)
    }
}