import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Query, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '@Common/index';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from '@Common/Multer';
import { ProductFactory } from './Factory';
import { Auth } from '@Common/index';
import { Types } from 'mongoose';
import { Public } from '@Common/Decorator/public.decorators';

@Controller('product')
@Auth(["Admin"])
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly productFatory: ProductFactory
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo', multerOption))
  async create(@Body() createProductDto: CreateProductDto, @User() user: any, @UploadedFile() file: Express.Multer.File) {
    const prouct = this.productFatory.createProduct(createProductDto, user)
    const createdSuccess = await this.productService.create(prouct, file, user)
    return { Message: "Product created successfully", Succsess: true, data: createdSuccess }
  }
  @Public()
  @Get("/search/:id")
  async findbyName(@Query('name') name: string, @Param('id') id: string | Types.ObjectId) {
    const product = await this.productService.findBySlug(name, id)
    console.log(id);

    return { Message: "Product fetched successfully", Succsess: true, data: product }
  }
  @Public()
  @Get()
  async findAll() {
    const product = await this.productService.findAll();
    return { Message: "Product fetched successfully", Succsess: true, data: product }
  }
  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string | Types.ObjectId) {
    const prodcut = await this.productService.findOne(id);
    return { Message: "Product fetched successfully", Succsess: true, data: prodcut }
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo', multerOption))
  async update(@Param('id') id: string | Types.ObjectId, @Body() productDto: UpdateProductDto, @User() user: any ,@UploadedFile() file?:Express.Multer.File) {
    console.log(id);

    const product = await this.productFatory.update(productDto, user, id)
    const updateProduct = await this.productService.update(id, product , file)
    return { Message: "Success Updated Product", Success: true }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
