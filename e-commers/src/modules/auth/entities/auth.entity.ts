import { Types } from "mongoose"

export class User {
      readonly _id:Types.ObjectId
        firstName:string
        lastName:string
        email:string
        password:string
        dob:Date
        otp:string
        expireOtp:Date
        isVerifyed:boolean
}
