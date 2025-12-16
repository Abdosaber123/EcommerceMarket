import { Admin, AdminRipo, adminSchema, Seller, SellerRipo, sellerSchema, User, UserRipo, userSchema } from "@Model/index";
import { Controller, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:User.name , schema:userSchema , discriminators:[
                {name:Seller.name , schema:sellerSchema},
                {name:Admin.name , schema:adminSchema}
            ]}
        ])
        
    ],
    controllers:[],
    providers:[UserRipo , SellerRipo , AdminRipo],
    exports:[UserRipo , SellerRipo , AdminRipo]
})
export class UserMongooseModule{}
