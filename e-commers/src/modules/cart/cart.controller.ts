import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, User } from '@Common/index';
import { asyncWrapProviders } from 'async_hooks';

@Controller('cart')
@Auth(["User" , "Admin"])

export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async create(@Body() createCartDto: AddToCartDto, @User() user: any) {
    const cart = await this.cartService.create(createCartDto, user);
    return { Message: "Product added to cart successfully", Succsess: true, data: cart }
  }



  @Get('')
  async findOne(@User() user: any) {
    const cart = await this.cartService.GetAllCart(user);
    return { Message: "Product fetched successfully", Succsess: true, data: cart }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Put('clear-ALL')
  async clearAll(@User() user: any) {
    const cart = await this.cartService.clearAll(user);
    return { Message: "Cart cleared successfully", Succsess: true, data: cart }
  }
  
  @Put(':id')
  async remove(@Param('id') id: string, @User() user: any) {
    const cart = await this.cartService.remove(id, user);
    return { Message: "Product removed from cart successfully", Succsess: true, data: cart }
  }


}
