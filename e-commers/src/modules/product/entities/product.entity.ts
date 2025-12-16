import { Types } from "mongoose"

export class Product {
    readonly _id: Types.ObjectId
    name: string
    slug: string
    description: string
    categoryId: Types.ObjectId
    brandId?: Types.ObjectId
    createdBy: Types.ObjectId
    updatedBy: Types.ObjectId
    price: number
    stock:number
    sold:number
    photo?:{
        secure_url?:string,
        public_id?:string
    }
}
