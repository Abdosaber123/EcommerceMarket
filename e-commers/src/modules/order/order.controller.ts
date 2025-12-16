import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, User } from '@Common/index';
import { Types } from 'mongoose';

@Controller('order')
@Auth(["Admin" , "User"] )

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto , @User() user:any) {
    const cart = await this.orderService.create(createOrderDto , user);
    if(cart instanceof Array)
      return{Message:"Failed to create order" , Success:false , failProdcuts:cart}
    return {Message:"Order created successfully" , Success:true , order:cart}
  }

  @Get('user')
  findOne(@User() user:any) {
    return this.orderService.findOne(user);
  }

  @Get('get-all')
  async findAll() {
    const order = await this.orderService.findAll();
    return {Message:"Order found successfully" , Success:true ,data: order}
   
  }
  @Get("userid/:id")
  async getUserById(@Param('id') id:any){
    const order = await this.orderService.findById(id)
    return {Message:"Order found successfully" , Success:true ,data: order}
  }

  @Patch('update/:id')
  async update(@Param('id') id: string | Types.ObjectId, @Body() updateOrderDto: UpdateOrderDto) {
    const order = await this.orderService.update(id, updateOrderDto);
    return {Message:"Order updated successfully" , Success:true , order:order}
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    const done = await this.orderService.remove(id);
    return {Message:"Order deleted successfully" , Success:true }
  }
}
