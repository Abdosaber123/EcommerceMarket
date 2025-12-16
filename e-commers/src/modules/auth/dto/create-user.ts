import { Transform } from "class-transformer"
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    firstName: string
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    lastName: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    password: string
    @IsDate()
    @IsNotEmpty()
    @Transform(({value})=>new Date(value))
    dob: Date
}
