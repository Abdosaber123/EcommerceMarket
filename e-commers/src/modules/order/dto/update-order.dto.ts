import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '@Model/index';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderDto  {
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    Status:OrderStatus
}
