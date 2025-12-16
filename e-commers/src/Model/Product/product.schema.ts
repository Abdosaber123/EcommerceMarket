import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

export enum DiscountType {
    fixed_Amount = 'fixed_Amount',
    percentge ='precentge'
}
@Schema({timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})
export class Product {
    readonly _id:Types.ObjectId
    @Prop({type:String , required:true , trim:true})
    name:string
    @Prop({type:String , required:true , trim:true})
    slug:string
    @Prop({type:String , required:true ,})
    description:string
    @Prop({type:SchemaTypes.ObjectId , required:true , ref:"Category"})
    categoryId:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId ,  ref:"Brand"})
    brandId?:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId , required:true , ref:"User"})
    createdBy:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId , required:true , ref:"User"})
    updatedBy:Types.ObjectId
    @Prop({type:Number , required:true ,min:1 })
    price:number
    // @Prop({type:Number , required:true ,min:1,default:0 })
    // discountAmount:number
    // @Prop({type:String ,enum:DiscountType ,default:DiscountType.fixed_Amount  })
    // discountType:DiscountType
    // @Virtual({
    //     get:function(this:Product){
    //         if(this.discountType ==DiscountType.fixed_Amount)
    //             return this.price - this.discountAmount;
    //         return this.price - this.price * (this.discountAmount /100)
    //     }
    // })
    // finalPrice:number
    @Prop({type:Number , min:1 ,default:1 })
    stock:number
    @Prop({type:Number ,min:0 ,default:1 })
    sold:number
    // @Prop({type:[String]})
    // colors:string[]
    // @Prop({type:[String]})
    // sizes:string[]
    @Prop({type:{
         public_id:String,
          secure_url:String
    }})
    photo?:{
        public_id?:string,
        secure_url?:string
    }
}
export const productSchema = SchemaFactory.createForClass(Product)