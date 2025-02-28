import { Injectable } from '@nestjs/common'

@Injectable()
export class NotesService {
  findAll() {
    return '获取所有笔记'
  }

  findOne(id: string) {
    return `获取笔记 ${id}`
  }
}
