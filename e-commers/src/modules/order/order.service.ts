import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@Modules/cart/cart.service';
import { CartRipo } from '@Model/Cart/cart.ripo';
import { Types } from 'mongoose';
import { OrderRipo } from '@Model/index';
import { ProductRipo } from '@Model/Product/product.ripo';
import path from 'path';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService:CartService,
    private readonly orderRipo:OrderRipo,
    private readonly productRipo:ProductRipo

  ){}
  async create(createOrderDto: CreateOrderDto , user:any) {
    const cart = await this.cartService.GetAllCart(user)
   if(cart.productId.length ==0){
    return {Message:"Cart is Emty " , Success:false}
   }
   
   
   const failProdcuts:{productId:Types.ObjectId , reson:string}[] = []
   const successProdcut:{productId:Types.ObjectId , quantity:number , totalPrice:number }[] = []
   for (const product of cart.productId) {
    const productExists = await this.productRipo.get({_id:product.productId})
    if(!productExists){ 
      failProdcuts.push({productId:product.productId , reson:"Product Not Found"});
      continue
      }
      if(productExists.stock < product.quantity){
        failProdcuts.push({productId:product.productId , reson:"  Not enough stock"});
          continue
      }
      successProdcut.push({productId:product.productId , quantity:product.quantity , totalPrice:productExists.price * product.quantity})
    }
  if(failProdcuts.length > 0){
    return {Message:"Order Failed " , Success:false , failProdcuts}
  }
  const order = await this.orderRipo.create({
    userId: user._id,
    product:successProdcut,
    Address:createOrderDto.address,
    paymentMethod:createOrderDto.paymentMethod,
    totalAmount:successProdcut.reduce((total,product)=>total+product.totalPrice,0)
  })
  

  await this.cartService.clearAll(user)
   

  return order

    
  }

  async findOne(user:any) {
   return await this.orderRipo.get({userId:user._id} , {} , {
    populate:[
      {path:"product.productId"}
    ]
   })
  }

  async findAll() {
    
    const order = await this.orderRipo.getAll({},{},{
    populate:[
      {path:"userId"},
      {path:"product.productId"}
    ],
    sort:{createdAt:-1}
  
    })
  
    if(!order) throw new NotFoundException("Order not found");
    return order
   
  }
  async findById(id:any){
    const order = await this.orderRipo.get({_id:id} ,{},{
      populate:[
        {path:"userId"},
        {path:"product.productId"}
      ]
    })
    return order
  }

  async update(id: string |Types.ObjectId, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRipo.update({_id:id} , {orderStatus:updateOrderDto.Status} )
    if(!order) throw new NotFoundException("Order not found");
    return order
  }

  async remove(id:string |Types.ObjectId) {
    const orderDelete = await this.orderRipo.deleteOne({_id:id})
    if(!orderDelete) throw new NotFoundException("Order not found");
    return orderDelete
  }
}
