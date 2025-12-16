import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryFactory } from './Factory';
import { Auth, User } from '@Common/index';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from '@Common/Multer';
import { Public } from '@Common/Decorator/public.decorators';
import { Types } from 'mongoose';

@Controller('category')
@Auth(["Admin"])
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly factoryCategory:CategoryFactory
  ) {}

    @Post()
    @UseInterceptors(FileInterceptor('photo',multerOption))
  async create(@Body() createCategoryDto: CreateCategoryDto , @User() user:any,@UploadedFile() file:Express.Multer.File ) {
    const category = this.factoryCategory.create(createCategoryDto,user)
    const createdSuccess = await this.categoryService.create(category,file);
    return {Message:"Category created successfully" , Succsess:true ,data: createdSuccess}
  }

  @Get()
  @Public()
  async findAll() {
    const category = await this.categoryService.findAll();
    return {Message:"Category fetched successfully" , Succsess:true ,data: category}
  }
  @Get("/search")
  async findbyName(@Query('name') name:string){
    const category = await this.categoryService.findByName(name)
      console.log(name);
    return {Message:"Category fetched successfully" , Succsess:true ,data: category}
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(id);
    return {Message:"Category fetched successfully" , Succsess:true ,data: category}
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto , @User() user:any) {
    const category = this.factoryCategory.update(updateCategoryDto , user)
    await this.categoryService.update(id , category)
    return {Message:"Category updated successfully" , Succsess:true }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string | Types.ObjectId) {
    await this.categoryService.remove(id);
    return {Message:"Category deleted successfully" , Succsess:true }
  }
  
}
