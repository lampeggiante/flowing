import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { NotesService } from './notes.service'

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return '获取所有笔记'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `获取笔记 ${id}`
  }
}
