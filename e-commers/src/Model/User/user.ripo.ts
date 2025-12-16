import { AbstractRepository } from "@Model/AbstractRipository";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
@Injectable()
export class UserRipo extends AbstractRepository<User>{
    constructor(@InjectModel(User.name)userModel:Model<User>){
        super(userModel)
    }
}