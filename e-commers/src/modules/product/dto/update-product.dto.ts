import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UpdateProductDto extends PartialType(CreateProductDto) {
     photo?:{
        secure_url?:string,
        public_id?:string
    }
}
