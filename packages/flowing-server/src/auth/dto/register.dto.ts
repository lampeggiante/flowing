import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(4, { message: '用户名最少4个字符' })
  @MaxLength(20, { message: '用户名最多20个字符' })
  username: string

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是字符串' })
  @MinLength(8, { message: '密码最少8个字符' })
  @MaxLength(20, { message: '密码最多20个字符' })
  password: string
}
