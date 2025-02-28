import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../v1/users/schemas/user.schema'
import { Note, NoteDocument } from '../v1/notes/schemas/note.schema'

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>
  ) {}

  async onModuleInit() {
    await this.initializeDatabase()
  }

  async initializeDatabase() {
    try {
      // 检查是否已经初始化
      const adminExists = await this.userModel.findOne({ role: 'admin' })

      if (!adminExists) {
        // 创建管理员用户
        const admin = await this.userModel.create({
          email: 'admin@example.com',
          name: 'Admin',
          role: 'admin'
        })

        // 创建示例笔记
        await this.noteModel.create({
          title: '欢迎使用',
          content: '这是一个示例笔记',
          authorId: admin._id
        })

        console.log('数据库初始化成功')
      }
    } catch (error) {
      console.error('数据库初始化失败:', error)
      throw error
    }
  }

  // 添加一个清理数据库的方法（仅用于开发环境）
  async clearDatabase() {
    if (process.env.NODE_ENV === 'development') {
      await Promise.all([
        this.userModel.deleteMany({}),
        this.noteModel.deleteMany({})
      ])
    }
  }
}
