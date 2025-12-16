import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRipo } from '@Model/Brand/brand.ripo';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor (
    private readonly brandRipo:BrandRipo
  ){}
  async create(brand: Brand) {
      const categoryExists = await this.brandRipo.get({ slug: brand.slug })
      if (categoryExists) {
        throw new ConflictException("Category already exists")
      }
      return await this.brandRipo.create(brand)
    }

    async update(id: string, brand: Brand) {
      // const categoryExists = await this.categoryRipo.get({ slug: category.slug , _id:{ $ne: id } })
      const categoryExists = await this.brandRipo.get({_id:id})
      if (!categoryExists) {
        throw new ConflictException("Category Not Found")
      }
      const slugExists = await this.brandRipo.get({slug:brand.slug , _id:{ $ne: id } })
      if(slugExists){
        throw new ConflictException("Category already exists")
      }
      return await this.brandRipo.findByIdAndUpdate({_id:id},brand , {new:true})
    }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
  async findOne(id:string |Types.ObjectId){
    const brandExists = await this.brandRipo.get({_id:id})
    if(!brandExists){
      throw new ConflictException("Category Not Found")
    }
    return brandExists
  }
}
