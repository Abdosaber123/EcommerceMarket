import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-user';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from '@Common/Decorator/auth.decorators';
import { AuthFactory } from './Factory.ts';
import { LoginDto } from './dto/loginDto';
import { IsVerifyed } from './dto/isVerifyed';
import { ResendOtpDto } from './dto/ResendOtpDto';
import { ForgetPasswordDto } from './dto/forgetPasswordDto';
import { Types } from 'mongoose';
import { UpdateRoleDto } from './dto/updateRoleDTO';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactory: AuthFactory
  ) { }

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = this.authFactory.create(createAuthDto)
    const createUser = await this.authService.create(user)
    return { Message: "Success Create Account", Success: true, data: createUser }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    return { Message: "Success Login", Success: true, data: token }
  }

  @Post("IsVerifye")
  async IsVerifyed(@Body() issVerifyedDto: IsVerifyed) {
    await this.authService.isVerifyed(issVerifyedDto)
    return { Message: "Success Verify", Success: true }
  }
  @Post("resendOtp")
  async resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    await this.authService.resendOtp(resendOtpDto)
    return { Message: "Success Resend Otp", Success: true }
  }
  @Post("forgetPassword")
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.forgetPassword(forgetPasswordDto)
    return { Message: "Success Forget Password", Success: true }
  }
  @Get('getAllUser')
  async getAllUser(){
    const user = await this.authService.getAllUser()
    return { Message: "Success Get All User", Success: true , data:user}
  }
  @Patch('/updateRole/:id')
  async updateRole(@Param('id') id:string|Types.ObjectId , @Body() updateRole:UpdateRoleDto){
    const update = await this.authService.updateRole(id,updateRole)
    console.log('id',id);
    console.log(updateRole);
    
    
    return {Message:"SuccessFuly Updated Role User" , Success:true}
  }
  @Delete("/delete/:id")
  async deleteUser(@Param('id') id:string | Types.ObjectId){
    await this.authService.deleteUser(id)
    return {Message:"Deleted User SuccessFuly" , Success:true}
  }
}
