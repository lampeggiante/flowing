import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string
  @Prop({ required: true })
  encryptedPassword: string
  // @Prop({ required: true })
  // avatar: string
  // @Prop({ required: false })
  // email: string
}

export const UserSchema = SchemaFactory.createForClass(User)
