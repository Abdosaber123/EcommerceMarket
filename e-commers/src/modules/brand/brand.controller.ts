import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandFecroty } from './Factory';
import { Auth, User } from '@Common/index';

@Controller('brand')
@Auth(["Admin"])
export class BrandController {
  constructor(private readonly brandService: BrandService,
    private readonly BrandFecroty:BrandFecroty
  ) {}

    @Post()
    async create(@Body() createBrandDto: CreateBrandDto , @User() user:any ) {
      const brand = this.BrandFecroty.create(createBrandDto,user)
      const createdSuccess = await this.brandService.create(brand);
      return {Message:"Brand created successfully" , Succsess:true ,data: createdSuccess}
    }

  

   @Put(':id')
    async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto , @User() user:any) {
      const brand = this.BrandFecroty.update(updateBrandDto , user)
      await this.brandService.update(id , brand)
      return {Message:"Brand updated successfully" , Succsess:true }
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }
  @Get()
  async findOne(@Param('id') id: string) {
    const brand = await this.brandService.findOne(id);
    return {Message:"Brand fetched successfully" , Succsess:true ,data: brand}
  }
}
