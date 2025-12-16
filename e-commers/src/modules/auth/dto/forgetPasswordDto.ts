import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ForgetPasswordDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    otp:string
    @IsString()
    @IsNotEmpty()
    password:string
}