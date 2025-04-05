import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../v1/users/users.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { UserRole } from 'src/v1/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    console.log('JWT_SECRET:', this.configService.get('JWT_SECRET'))
  }

  async register(registerDto: RegisterDto, @Req() request: any) {
    const userExists = await this.userService.findByUsername(
      registerDto.username
    )
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(registerDto.password, salt)

    // 检查 header 中的 clyde-tag
    const clydeTag = request.headers['clyde-tag']
    console.log('clyde-tag:', clydeTag)
    const adminTag = this.configService.get<string>('ADMIN_TAG')

    // 设置用户角色
    const role =
      clydeTag && clydeTag === adminTag ? UserRole.ADMIN : UserRole.USER

    return this.userService.create({
      username: registerDto.username,
      encryptedPassword: hashedPassword,
      role: role,
      is_deleted: false
    })
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.encryptedPassword
    )

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED)
    }

    // 登录成功后生成 token
    const token = this.generateToken(user)
    return { user, token }
  }

  private generateToken(user: any) {
    const payload = {
      sub: user._id,
      username: user.username
    }
    return this.jwtService.sign(payload)
  }
}
