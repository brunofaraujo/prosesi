import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthRecoverDTO } from "./dto/auth-recover.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: AuthLoginDTO) {
        
        return await this.authService.login(body)

    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {

        return await this.authService.register(body)

    }

    @Post('recover')
    async recover(@Body() body: AuthRecoverDTO) {

        return await this.authService.recover(body)

    }

    @Post('reset')
    async reset(@Body() body: AuthResetDTO) {

        return await this.authService.reset(body)

    }


    // Test route
    @Post('me')
    async me(@Body() body) {
        return await this.authService.checkToken(body.token)
    }

}