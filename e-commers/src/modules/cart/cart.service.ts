import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '@Modules/product/product.service';
import { CartRipo } from '@Model/Cart/cart.ripo';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepo: CartRipo,
  ) { }
  async create(addToCartDto: AddToCartDto, user: any) {
    const product = await this.productService.findOne(addToCartDto.productId)
    const cart = await this.cartRepo.get({ userId: user._id })
    if (!cart) {
      return await this.cartRepo.create({
        userId: user._id,
        productId: [{ productId: addToCartDto.productId, quantity: addToCartDto.quantity }]
      })
    }
    const index = cart.productId.findIndex((procut) => procut.productId.equals(addToCartDto.productId))
    if (index == -1) {
      cart.productId.push({ productId: addToCartDto.productId, quantity: addToCartDto.quantity })
    } else {
      if (addToCartDto.quantity == 0) {
        return await this.remove(addToCartDto.productId , user)
      } else {
        cart.productId[index].quantity = addToCartDto.quantity
      }
    }
    await cart.save()
    return cart
  }



  async GetAllCart(user: any) {
    const cart = await this.cartRepo.get({ userId: user._id } ,{} , {
      populate:[
        {path:"productId.productId"}
      ]
    })
    if (!cart) {
      throw new NotFoundException("Cart not found")
    }
    return cart
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

 
async remove(productID: string | Types.ObjectId, user: any) {
  const product = await this.cartRepo.findOneAndUpdate(
    {
      userId: user._id,
      'productId.productId': productID,
    },
    {
      $pull: { productId: { productId: productID } }
    },
    { new: true } // أو returnDocument: 'after'
  );

  console.log(productID);
  console.log(user._id);
  

  if (!product) {
    throw new ConflictException("cart not found");
  }

  return product;
}

 
  async clearAll(user: any) {
    return await this.cartRepo.findOneAndUpdate({ userId: user._id }, { productId: [] })

  }
}
