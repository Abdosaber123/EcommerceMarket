import { genrateOTP } from "@Common/getarteOTP";
import { CreateAuthDto } from "../dto/create-user";
import { User } from "../entities/auth.entity";
import { hash } from "crypto";
import { hashSync } from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthFactory {
    create(createAuthDto: CreateAuthDto) {
        const user = new User()
        user.firstName = createAuthDto.firstName
        user.lastName = createAuthDto.lastName
        user.email = createAuthDto.email
        user.password = hashSync(createAuthDto.password, 10)
        user.dob = createAuthDto.dob
        user.otp = genrateOTP()
        user.isVerifyed = false
        user.expireOtp = new Date(Date.now() + 15 * 60 * 1000)
        return user
    }
}