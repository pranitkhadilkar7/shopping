import { Body, Controller, Post } from '@nestjs/common'
import { SignupDto } from './dto/signup.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return 'This is a login controller'
  }

  @Post('signup')
  signup(@Body() signupUserDto: SignupDto) {
    return this.authService.registerUser(signupUserDto)
  }
}
