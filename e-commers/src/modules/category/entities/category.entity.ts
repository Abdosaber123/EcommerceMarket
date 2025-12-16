import { Types } from "mongoose"

export class Category {
     readonly _id:Types.ObjectId
        name:string
        slug:string
        createdBy:Types.ObjectId
        updatedBy:Types.ObjectId
        photo?:{
        secure_url?:string,
        public_id?:string
    }
}
