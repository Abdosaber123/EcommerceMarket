import slugify from "slugify";
import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductRipo } from "@Model/Product/product.ripo";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductFactory {
   constructor(
      private readonly productRipo:ProductRipo
   ) { }
   createProduct(productDto: CreateProductDto, user: any) {
      const product = new Product()
      product.name = productDto.name
      product.description = productDto.description
      product.categoryId = productDto.categoryId

      product.price = productDto.price
      product.stock = productDto.stock
      product.createdBy = user._id
      product.updatedBy = user._id
      product.slug = slugify(productDto.name)
      return product
   }
   async update(productDto: UpdateProductDto, user: any, id: any) {
      const prodcutExists = await this.productRipo.get({ _id: id })
      if(!prodcutExists){
         throw new Error("Product not found")
      }
      const product = new Product()
      product.name = productDto.name || prodcutExists.name 
      product.description = productDto.description || prodcutExists.description 
      product.categoryId = productDto.categoryId || prodcutExists.categoryId
      product.price = productDto.price || prodcutExists.price as number
      product.stock = productDto.stock || prodcutExists.stock as number
      product.createdBy = user._id 
      product.updatedBy = user._id 
      product.photo?.secure_url == productDto.photo?.secure_url || prodcutExists.photo?.secure_url
      product.slug = slugify(productDto.name || prodcutExists.name)
      return product
   }
}