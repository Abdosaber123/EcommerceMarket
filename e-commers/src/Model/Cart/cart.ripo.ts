import { AbstractRepository } from "@Model/AbstractRipository";
import { Cart } from "./cart.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CartRipo extends AbstractRepository<Cart>{
    constructor(@InjectModel(Cart.name) cartModel:Model<Cart> ){
        super(cartModel)
    }
}