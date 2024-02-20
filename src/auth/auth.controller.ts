import { Body, Controller, Post } from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginDto) {
    return this.authService.login(loginUserDto)
  }

  @Post('signup')
  signup(@Body() signupUserDto: SignupDto) {
    return this.authService.registerUser(signupUserDto)
  }
}
