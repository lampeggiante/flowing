import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  Query
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Types } from 'mongoose'

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('create_note')
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @Query('user_id') userId: string
  ) {
    return this.notesService.create(createNoteDto, new Types.ObjectId(userId))
  }

  @Get('get_all_notes')
  async findAll(@Query('user_id') userId: string) {
    return this.notesService.findAll(new Types.ObjectId(userId))
  }

  @Get('get_note/:id')
  async findOne(@Param('id') id: string, @Query('user_id') userId: string) {
    return this.notesService.findOne(id, new Types.ObjectId(userId))
  }

  @Put('update_note/:id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Query('user_id') userId: string
  ) {
    return this.notesService.update(
      id,
      updateNoteDto,
      new Types.ObjectId(userId)
    )
  }

  @Delete('delete_note/:id')
  async remove(@Param('id') id: string, @Query('user_id') userId: string) {
    return this.notesService.remove(id, new Types.ObjectId(userId))
  }

  @Get(':id/get_children')
  async findChildren(
    @Param('id') id: string,
    @Query('user_id') userId: string
  ) {
    return this.notesService.findChildren(id, new Types.ObjectId(userId))
  }
}
