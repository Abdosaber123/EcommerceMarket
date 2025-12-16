import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { BrandService } from '@Modules/brand/brand.service';
import { CategoryService } from '@Modules/category/category.service';
import { ProductRipo } from '@Model/Product/product.ripo';
import cloudinary from '@Common/Multer/config';
import { Types } from 'mongoose';
import { retry } from 'rxjs';


@Injectable()
export class ProductService {
  constructor(
    private readonly brandService:BrandService,
    private readonly categoryService:CategoryService,
    private readonly productRipo:ProductRipo
  ) { }
  async create(product: Product , file:Express.Multer.File , user:any) {
    // const brand = this.brandService.findOne(product.brandId)
    const category = this.categoryService.findOne(product.categoryId)
    const productExits = await this.productRipo.get({
       slug: product.slug ,
       $or:[{createdBy:user._id} , {updatedBy:user._id}]
      })
    // if(!productExits) throw new NotFoundException("Product Already Exits")
    const {public_id , secure_url } = await cloudinary.uploader.upload(file.path ,{
      folder:"products",
      public_id:product.photo?.public_id  
    })
    product.photo = {public_id , secure_url}
    // if(productExits){
    //   return await this.update(productExits._id , product)
    //   }
    return await this.productRipo.create(product)
  }

  async findAll() {
    const product = await this.productRipo.getBySort({
      
    },{} ,
      {sort:{name:1 },
    populate:[
      {path:"categoryId"}
    ]
    },)
    return product
  }

  async findOne(id: Types.ObjectId | string) {
    const prodcutExists= await this.productRipo.get({_id:id},{},{populate:[
      {path:"categoryId"}
    ]})
    if(!prodcutExists) throw new NotFoundException("Product Not Found")
    return prodcutExists
  }

 async update(id: string | Types.ObjectId, product: Product , file?:Express.Multer.File) {
    const productExits = await this.productRipo.get({ _id: id })
    if (!productExits) throw new NotFoundException("Product Not Found");
    // product.stock += productExits.stock
    if(file){
      const {public_id , secure_url } = await cloudinary.uploader.upload(file.path ,{
      folder:"products",
      public_id:product.photo?.public_id  
    })
    product.photo = {public_id , secure_url}
    
    }
    return await this.productRipo.findByIdAndUpdate({ _id: id }, product, { new: true })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async findBySlug(slug:string ,id:Types.ObjectId | string){
 
    const product = await this.productRipo.getByQuery({ slug:{ $regex:slug , $options:"i"}  } , {} , {
      populate:[
        {path:"categoryId"}
      ]
    })
    if(!product) throw new NotFoundException("Product Not Found")
    return product
  }
}
