
import { AbstractRepository } from "@Model/AbstractRipository";
import { Product } from "./product.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductRipo extends AbstractRepository<Product>{
constructor(@InjectModel(Product.name) private readonly productModel:Model<Product>){
    super(productModel)
}
}