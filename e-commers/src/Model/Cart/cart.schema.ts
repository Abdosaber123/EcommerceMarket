import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class productCart{
    @Prop({type:SchemaTypes.ObjectId , ref:"Product"})
    productId:Types.ObjectId
    @Prop({type:Number , default:1})
    quantity:number
}
@Schema({timestamps:true})
export class Cart{
    @Prop({type:SchemaTypes.ObjectId , ref:"User"})
    userId:Types.ObjectId;
    @Prop({type:[productCart],default:[]})
    productId:productCart[]
    
}
export const CartSchema = SchemaFactory.createForClass(Cart);