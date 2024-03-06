import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { SignupDto } from './dtos/signup.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { Public } from '../common/decorators/public.decorator'
import { ForgotPasswordDto } from './dtos/forgot-password.dto'
import { ResetPasswordDto } from './dtos/reset-password.dto'

@Public()
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

  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Patch('reset-password/:token')
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param('token') token: string,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto.password)
  }
}
