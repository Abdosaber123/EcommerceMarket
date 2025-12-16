import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { UserRipo } from '@Model/index';
import { sendEmail } from '@Common/SendEmail';
import { LoginDto } from './dto/loginDto';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IsVerifyed } from './dto/isVerifyed';
import { ResendOtpDto } from './dto/ResendOtpDto';
import { genrateOTP } from '@Common/getarteOTP';
import { ForgetPasswordDto } from './dto/forgetPasswordDto';
import { Types } from 'mongoose';
import { UpdateRoleDto } from './dto/updateRoleDTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRipo: UserRipo,
    private readonly jwb: JwtService,
    private readonly config: ConfigService
  ) { }
  async create(user: User) {
    const userExists = await this.userRipo.get({ email: user.email })
    if (userExists) {
      throw new NotFoundException('User already exists')
    }
    const userCreated = await this.userRipo.create(user)
    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      html: `<h1> Thx For Rigstration Your Otp is ${user.otp} </h1>`
    })
    const { password, otp, expireOtp, ...userObj } = JSON.parse(JSON.stringify(userCreated))
    return userObj
  }

  async login(loginDto: LoginDto) {
    console.log(loginDto.email);
    const userExists = await this.userRipo.get({ email: loginDto.email })

    if (!userExists) {
      throw new NotFoundException('User not found')
    }
    const isMatch = await compare(loginDto.password, userExists.password)
    if (!isMatch) {
      throw new NotFoundException('Invalid Password')
    }
    if (userExists.isVerifyed == false) throw new ConflictException("User is not verified");
    if (userExists.dob as unknown as number > Date.now() as unknown as number) {
      throw new ConflictException("User is not verified")
    }
    const token = this.jwb.sign({ _id: userExists._id, email: userExists.email, role: userExists.role }, {
      secret: this.config.get("Access").JWB_SECRET, expiresIn: "1d"
    })
    const {password , otp , expireOtp , ...userObj} = JSON.parse(JSON.stringify(userExists))
    return {token , userObj}
  }

  async isVerifyed(isVerifyedDto: IsVerifyed) {
    const userExists = await this.userRipo.get({ email: isVerifyedDto.email })
    if (!userExists) {
      throw new NotFoundException('User not found')
    }
    if (userExists.otp != isVerifyedDto.otp) {
      throw new NotFoundException('Invalid otp')
    }
    if (userExists.expireOtp as unknown as number < Date.now() as unknown as number) {
      throw new NotFoundException('Otp expired')
    }

    return await this.userRipo.update({ email: userExists.email }, { otp: "", expireOtp: "", isVerifyed: true })

  }
  async resendOtp(resendOtpDto: ResendOtpDto) {
    const userExists = await this.userRipo.get({ email: resendOtpDto.email })
    if (!userExists) {
      throw new NotFoundException('User not found')
    }
    const otp = genrateOTP()
    const expireOtp = new Date(Date.now() + 10 * 60 * 1000)
    
    await sendEmail({
      to: userExists.email,
      subject: 'ReSend Otp',
      html: `<h1> Your Otp is ${otp} </h1>`
    })
    return await this.userRipo.update({ email: userExists.email }, { otp: otp, expireOtp: expireOtp })



  }
  async forgetPassword(forgetPasswordDto:ForgetPasswordDto){
    const userExists = await this.userRipo.get({ email: forgetPasswordDto.email })
    if(!userExists){
      throw new NotFoundException('User not found')
    }
    if(userExists.otp != forgetPasswordDto.otp){
      throw new NotFoundException('Invalid otp')
    }
    if(userExists.expireOtp as unknown as number < Date.now() as unknown as number){
      throw new NotFoundException('Otp expired')
    }
    const hashPassword = hashSync(forgetPasswordDto.password, 10)
    return await this.userRipo.update({ email: userExists.email }, { password: hashPassword , otp:"" , expireOtp:"" })
    
    

  }
  async getAllUser(){
    const user = await this.userRipo.getAll({},{},{
      sort:{createdAt:-1}
    })
    return user
  }
  async updateRole(id:string |Types.ObjectId , updateRoleDto:UpdateRoleDto){
     return await this.userRipo.findByIdAndUpdate(
    {_id:id},
   updateRoleDto, // صح
    { new: true } // يرجع لك القيمة بعد التحديث
  );
  }
  async deleteUser(id:string | Types.ObjectId){
    return await this.userRipo.deleteOne({_id:id})
  }
}
