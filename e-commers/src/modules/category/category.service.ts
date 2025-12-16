import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRipo } from '@Model/Category/Category.Ripo';
import { Types } from 'mongoose';
import cloudinary from '@Common/Multer/config';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRipo: CategoryRipo
  ) { }
  async create(category: Category, file: Express.Multer.File) {
    const categoryExists = await this.categoryRipo.get({ slug: category.slug })
    if (categoryExists) {
      throw new ConflictException("Category already exists")
    }
    const { public_id, secure_url } = await cloudinary.uploader.upload(file.path, {
      folder: "Category",
      public_id: category.photo?.public_id
    })
     category.photo = {public_id , secure_url}
     
    return await this.categoryRipo.create(category)
  }

  async findAll() {
    return await this.categoryRipo.getAll()
  }

  async findOne(id: string | Types.ObjectId) {
    const gategoryExists = await this.categoryRipo.get({ _id: id })
    if (!gategoryExists) {
      throw new ConflictException("Category Not Found")
    }
    return gategoryExists
  }

  async update(id: string, category: Category) {
    // const categoryExists = await this.categoryRipo.get({ slug: category.slug , _id:{ $ne: id } })
    const categoryExists = await this.categoryRipo.get({ _id: id })
    if (!categoryExists) {
      throw new ConflictException("Category Not Found")
    }
    const slugExists = await this.categoryRipo.get({ slug: category.slug, _id: { $ne: id } })
    if (slugExists) {
      throw new ConflictException("Category already exists")
    }
    return await this.categoryRipo.findByIdAndUpdate({ _id: id }, category, { new: true })
  }

  async remove(id: string | Types.ObjectId) {
    const category = await this.categoryRipo.get({_id:id})
    if (!category) {
      throw new ConflictException("Category Not Found")
    }
    return await this.categoryRipo.deleteOne({ _id: id })
  }
  async findByName(name:string){
    const category = await this.categoryRipo.get({name:name})
    if(!category){
      throw new ConflictException("Category Not Found")
    }
    console.log(name);
    
    return category
  }

}
