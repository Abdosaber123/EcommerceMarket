import slugify from "slugify";

import { Injectable } from "@nestjs/common";
import { Brand } from "../entities/brand.entity";
import { CreateBrandDto } from "../dto/create-brand.dto";
import { UpdateBrandDto } from "../dto/update-brand.dto";


@Injectable()
export class BrandFecroty {
    create(createBrandDto: CreateBrandDto, user: any) {
        const brand = new Brand()
        brand.name = createBrandDto.name
        brand.slug = slugify(createBrandDto.name)
        brand.createdBy = user._id
        brand.updatedBy = user._id
        return brand
    }
    update(updateBrandDto: UpdateBrandDto, user: any) {
        const brand = new Brand()
        brand.name = updateBrandDto.name as string
        brand.slug = slugify(updateBrandDto.name as string)
     
        brand.updatedBy = user._id
        return brand
    }
}