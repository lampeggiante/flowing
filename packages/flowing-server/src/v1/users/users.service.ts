import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  findAll() {
    return '获取所有用户-测试'
  }

  findOne(id: string) {
    return `获取用户 ${id}`
  }
}
