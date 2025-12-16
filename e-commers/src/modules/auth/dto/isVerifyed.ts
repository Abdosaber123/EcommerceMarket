import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class IsVerifyed{
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    otp:string
@IsString()
@IsNotEmpty()
    email:string
}