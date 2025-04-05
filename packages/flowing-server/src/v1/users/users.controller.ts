import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User, UserRole } from './schemas/user.schema'
import { AdminGuard } from '../../common/guards/admin.guard'

@Controller()
@UseGuards(AdminGuard) // 所有接口都需要管理员权限
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all_users')
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id/status')
  async updateUserStatus(
    @Param('id') id: string,
    @Body('is_deleted') is_deleted: boolean
  ) {
    return this.usersService.updateStatus(id, is_deleted)
  }

  @Put(':id/role')
  async updateUserRole(@Param('id') id: string, @Body('role') role: UserRole) {
    return this.usersService.updateRole(id, role)
  }
}
