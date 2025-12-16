import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./roles.decorator"
import { AuthGuard } from "@Common/Guards/auth.guard"
import { RolesGuard } from "@Common/Guards/role.guard"


export const Auth = (roles:string[]) => {
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}