import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common'
import { UserRole } from '../../v1/users/schemas/user.schema'
import { UsersService } from '../../v1/users/users.service'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { username } = request.user

    if (!username) {
      throw new ForbiddenException('未找到用户信息')
    }

    const user = await this.usersService.findByUsername(username)

    if (!user || user.is_deleted) {
      throw new ForbiddenException('用户不存在或已被禁用')
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('需要管理员权限')
    }

    return true
  }
}
