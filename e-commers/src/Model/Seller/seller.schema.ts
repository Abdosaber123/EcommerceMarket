import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({timestamps:true ,toJSON:{virtuals:true} , toObject:{virtuals:true},discriminatorKey:'role'})
export class Seller {
    readonly _id:Types.ObjectId
    @Prop({type:String , minLength:3 , maxLength:20 , required:true})
    firstName:string
    @Prop({type:String , minLength:3 , maxLength:20 , required:true})
    lastName:string
    @Prop({type:String , required:true , unique:true})
    email:string
    @Prop({type:String , required:true})
    password:string
    @Prop({type:Date})
    dob:Date
    
}
export const sellerSchema = SchemaFactory.createForClass(Seller)