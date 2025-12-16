import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class ResendOtpDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string
}