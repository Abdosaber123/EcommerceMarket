import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps:true , _id:false})
export class Address{
@Prop({type:String , required:true})
street:string
@Prop({type:String , required:true})
city:string
@Prop({type:String , required:true})
country:string
@Prop({type:String , required:true})
zipCode:string
@Prop({type:String , required:true})
phoneNumber:string
}
@Schema({timestamps:true , _id:false})
export class ProductOrder{
    @Prop({type:SchemaTypes.ObjectId , ref:"Product"})
    productId:Types.ObjectId
    @Prop({type:Number , default:1})
    quantity:number
    @Prop({type:Number ,required:true})
    totalPrice:number
}

export enum PaymentMethod{
COD='COD',
CREDIT_CARD='CREDIT_CARD',
}
export enum OrderStatus{
    PENDING='PENDING',
    PLACED="PLACED",
    SHIPPED='SHIPPED',
    DELIVERED='DELIVERED',
    CANCELLED='CANCELLED',
}
@Schema({timestamps:true})
export class Order{
    readonly _id:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId ,ref:"User"})
    userId:Types.ObjectId
    @Prop({type:Address , required:true})
    Address:Address
    @Prop({type:[ProductOrder] , required:true})
    product:ProductOrder[]
    @Prop({type:String , enum:PaymentMethod , default:PaymentMethod.COD , required:true})
    paymentMethod:PaymentMethod
    @Prop({type:String , enum:OrderStatus ,
         default:function(this:Order){
               if(this.paymentMethod ==PaymentMethod.COD){
                return OrderStatus.PLACED
               }
               return OrderStatus.PENDING
    } , required:true})
    orderStatus:OrderStatus
    @Prop({type:Number , required:true})
    totalAmount:number
}
export const orderSchema= SchemaFactory.createForClass(Order)