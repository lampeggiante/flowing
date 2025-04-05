import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsMongoId
} from 'class-validator'
import { Types } from 'mongoose'

export class CreateNoteDto {
  @IsString({ message: '标题必须是字符串' })
  title: string

  @IsString({ message: '内容必须是字符串' })
  content: string

  @IsNumber({}, { message: '层级必须是数字' })
  level: number

  @IsOptional()
  @IsMongoId({ message: '父笔记ID格式不正确' })
  parent_id?: Types.ObjectId

  @IsOptional()
  @IsArray({ message: '可编辑用户必须是数组' })
  @IsMongoId({ each: true, message: '用户ID格式不正确' })
  can_edit_users?: Types.ObjectId[]

  @IsOptional()
  @IsArray({ message: '可查看用户必须是数组' })
  @IsMongoId({ each: true, message: '用户ID格式不正确' })
  can_view_users?: Types.ObjectId[]
}
