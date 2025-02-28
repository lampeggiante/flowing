import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type NoteDocument = Note & Document

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  content: string

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId
}

export const NoteSchema = SchemaFactory.createForClass(Note)
