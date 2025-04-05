import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { Public } from '../common/decorators/auth.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} // 修改这里，首字母改为小写

  @Public()
  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user) // 这里也要改为小写
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginDto) {
    return this.authService.login(user) // 这里也要改为小写
  }
}
