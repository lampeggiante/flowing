import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument, UserRole } from './schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user)
    return createdUser.save()
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec()
  }

  async modify(id: string, user: User) {
    return this.userModel.findByIdAndUpdate(id, user).exec()
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id).exec()
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec()
  }

  async updateStatus(id: string, is_deleted: boolean) {
    return this.userModel.findByIdAndUpdate(id, { is_deleted }, { new: true })
  }

  async updateRole(id: string, role: UserRole) {
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true })
  }

  async findAll() {
    return this.userModel.find({ is_deleted: false })
  }
}
