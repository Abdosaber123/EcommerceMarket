import { IsMongoId, IsNumber } from "class-validator";
import { Types } from "mongoose";

export class AddToCartDto {
    @IsMongoId()
    productId:Types.ObjectId 
    @IsNumber()
    quantity:number
}
