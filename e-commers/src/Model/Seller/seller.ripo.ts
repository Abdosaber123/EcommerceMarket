import { AbstractRepository } from "@Model/AbstractRipository";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seller } from "./seller.schema";
@Injectable()
export class SellerRipo extends AbstractRepository<Seller>{
    constructor(@InjectModel(Seller.name)sellerModel:Model<Seller>){
        super(sellerModel)
    }
}