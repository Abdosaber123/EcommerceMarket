import { Transform } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    description: string
    @IsMongoId()
    @IsNotEmpty()
    categoryId: Types.ObjectId
    // @IsMongoId()
    // @IsNotEmpty()
    // brandId?: Types.ObjectId
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    price: number
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Number(value))
    stock: number
    
}
