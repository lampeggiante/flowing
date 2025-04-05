import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export enum UserRole {
  ADMIN = 'admin',
  VIP = 'vip',
  USER = 'user'
}

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.encryptedPassword
      return ret
    }
  },
  toObject: {
    transform: (doc, ret) => {
      delete ret.encryptedPassword
      return ret
    }
  }
})
export class User {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  encryptedPassword: string

  @Prop({ required: false, enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Prop({ required: false, default: false })
  is_deleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ username: 1, role: 1 })
