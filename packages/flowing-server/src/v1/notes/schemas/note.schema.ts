import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type NoteDocument = Note & Document

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  level: number

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  authorId: Types.ObjectId

  @Prop({
    type: Types.ObjectId,
    ref: 'Note',
    required: false,
    default: null,
    index: true
  })
  parentId: Types.ObjectId | null

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  // canEditUser: Types.ObjectId[]

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  // canViewUser: Types.ObjectId[]
}

export const NoteSchema = SchemaFactory.createForClass(Note)

// 添加复合索引
NoteSchema.index({ authorId: 1, createdAt: -1 })
