import { AbstractRepository } from "@Model/AbstractRipository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.schema";
@Injectable()
export class BrandRipo extends AbstractRepository<Brand>{
    constructor(@InjectModel(Brand.name) brandModel:Model<Brand>  ){
        super(brandModel)
    }
}