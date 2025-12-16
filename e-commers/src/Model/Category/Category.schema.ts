import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps:true })
export class Category {
    readonly _id:Types.ObjectId
    @Prop({type:String,required:true})
    name:string
    @Prop({type:String,required:true})
    slug:string
    @Prop({type:SchemaTypes.ObjectId , ref:"Admin"})
    createdBy:Types.ObjectId
    @Prop({type:SchemaTypes.ObjectId , ref:"Admin"})
    updatedBy:Types.ObjectId
    @Prop({type:{
         public_id:String,
          secure_url:String
    }})
    photo?:{
        public_id?:string,
        secure_url?:string
    }

}
export const categorySchema = SchemaFactory.createForClass(Category)