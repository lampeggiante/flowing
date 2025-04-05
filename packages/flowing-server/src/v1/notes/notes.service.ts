import {
  Injectable,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Note, NoteDocument } from './schemas/note.schema'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(
    createNoteDto: CreateNoteDto,
    userId: Types.ObjectId
  ): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      author_id: userId,
      is_deleted: false
    })
    const savedNote = await createdNote.save()
    return savedNote.populate('author_id', 'username')
  }

  async findAll(userId: Types.ObjectId): Promise<Note[]> {
    return this.noteModel
      .find({
        author_id: userId,
        is_deleted: false
      })
      .populate('author_id', 'username')
      .sort({ createdAt: -1 })
  }

  async findOne(id: string, userId: Types.ObjectId): Promise<Note> {
    const note = await this.noteModel
      .findOne({
        _id: id,
        is_deleted: false
      })
      .populate('author_id', 'username')
      .populate('can_edit_users', 'username')
      .populate('can_view_users', 'username')

    if (!note) {
      throw new NotFoundException('笔记不存在')
    }

    if (!this.canAccess(note, userId)) {
      throw new ForbiddenException('无权访问此笔记')
    }

    return note
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: Types.ObjectId
  ): Promise<Note> {
    const note = await this.noteModel.findById(id)

    if (!note || note.is_deleted) {
      throw new NotFoundException('笔记不存在')
    }

    if (!this.canEdit(note, userId)) {
      throw new ForbiddenException('无权编辑此笔记')
    }

    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .populate('author_id', 'username')
  }

  async remove(id: string, userId: Types.ObjectId): Promise<void> {
    const note = await this.noteModel.findById(id)

    if (!note || note.is_deleted) {
      throw new NotFoundException('笔记不存在')
    }

    if (note.author_id.toString() !== userId.toString()) {
      throw new ForbiddenException('只有作者可以删除笔记')
    }

    await this.noteModel.findByIdAndUpdate(id, { is_deleted: true })
  }

  async findChildren(
    parentId: string,
    userId: Types.ObjectId
  ): Promise<Note[]> {
    const parentNote = await this.noteModel.findById(parentId)
    if (!parentNote || parentNote.is_deleted) {
      throw new NotFoundException('父笔记不存在')
    }

    if (!this.canAccess(parentNote, userId)) {
      throw new ForbiddenException('无权访问此笔记')
    }

    return this.noteModel
      .find({
        parent_id: parentId,
        is_deleted: false
      })
      .populate('author_id', 'username')
      .sort({ createdAt: -1 })
  }

  private canAccess(note: Note, userId: Types.ObjectId): boolean {
    const userIdStr = userId.toString()
    return (
      note.author_id.toString() === userIdStr ||
      note.can_view_users.some((id) => id.toString() === userIdStr) ||
      note.can_edit_users.some((id) => id.toString() === userIdStr) ||
      note.author_id?._id.toString() === userIdStr ||
      note.can_view_users.some((id) => id?._id.toString() === userIdStr) ||
      note.can_edit_users.some((id) => id?._id.toString() === userIdStr)
    )
  }

  private canEdit(note: Note, userId: Types.ObjectId): boolean {
    const userIdStr = userId.toString()
    return (
      note.author_id.toString() === userIdStr ||
      note.can_edit_users.some((id) => id.toString() === userIdStr) ||
      note.author_id?._id.toString() === userIdStr ||
      note.can_edit_users.some((id) => id?._id.toString() === userIdStr)
    )
  }
}
