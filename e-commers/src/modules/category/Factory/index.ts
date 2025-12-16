import slugify from "slugify";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { Category } from "../entities/category.entity";
import { Injectable } from "@nestjs/common";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Injectable()
export class CategoryFactory {
    create(createCategoryDto: CreateCategoryDto, user: any) {
        const category = new Category()
        category.name = createCategoryDto.name
        category.slug = slugify(createCategoryDto.name)
        category.createdBy = user._id
        category.updatedBy = user._id
        return category
    }
    update(updateCategoryDto: UpdateCategoryDto, user: any) {
        const category = new Category()
        category.name = updateCategoryDto.name as string
        category.slug = slugify(updateCategoryDto.name as string)
     
        category.updatedBy = user._id
        return category
    }
}