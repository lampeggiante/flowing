import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './schemas/user.schema'

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

  async findAll() {
    return this.userModel.find().exec()
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
}
