import { Injectable } from '@nestjs/common'
// import { InjectModel } from '@nestjs/mongoose'
// import { Model } from 'mongoose'
// import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class UsersService {
  //   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return '查找所有用户'
    // return this.userModel.find().exec()
  }

  async findOne(id: string) {
    return `查找用户 ${id}`
    // return this.userModel.findById(id).exec()
  }
}
