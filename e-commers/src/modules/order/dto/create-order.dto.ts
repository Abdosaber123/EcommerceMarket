import { PaymentMethod } from "@Model/index"
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator"

class Address{
    @IsString()
    @IsNotEmpty()
    street:string
    @IsString()
    @IsNotEmpty()
    city:string
    @IsString()
    @IsNotEmpty()
    country:string
    @IsString()
    @IsNotEmpty()
    zipCode:string
    @IsString()
    @IsNotEmpty()
    phoneNumber:string
}

export class CreateOrderDto {
    @IsObject()
    @IsNotEmpty()
    address:Address
    @IsEnum(PaymentMethod)
    @IsOptional()
    paymentMethod:PaymentMethod
}
