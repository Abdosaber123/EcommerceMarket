import { Prop, Schema, SchemaFactory, Virtual } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({timestamps:true ,toJSON:{virtuals:true} , toObject:{virtuals:true}})
export class User {
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
    @Prop({type:String})
    otp:string
    @Prop({type:Date})
    expireOtp:Date
    @Prop({type:Boolean , default:false})
    isVerifyed:boolean
    @Virtual({
        get:function (this:User){
            return `${this.firstName} ${this.lastName}`
        }
    })
    fullName:string
    @Prop({ type: String,enum: ["User", "Admin"], default: "User" })
    role: string;
}
export const userSchema = SchemaFactory.createForClass(User)