import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps:true })
export class Brand {
    readonly _id:Types.ObjectId
    @Prop({typle:String,required:true})
    name:string
    @Prop({typle:String,required:true})
    slug:string
    @Prop({type:SchemaTypes.ObjectId , ref:"Admin"})
    createdBy:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId , ref:"Admin"})
    updatedBy:Types.ObjectId

}
export const brandSchema = SchemaFactory.createForClass(Brand)