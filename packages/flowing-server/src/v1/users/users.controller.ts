import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query
} from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './schemas/user.schema'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('delete_user/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id)
  }

  @Post('modify_user/:id')
  modifyUser(@Param('id') id: string, @Body() body: User) {
    return this.usersService.modify(id, body)
  }

  @Get('get_user')
  getUser(@Query('username') username: string) {
    return this.usersService.findByUsername(username)
  }

  @Get('get_users')
  getUsers() {
    return this.usersService.findAll()
  }
}
