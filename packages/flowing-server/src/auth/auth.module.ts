import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../v1/users/users.module'
import { UsersService } from '../v1/users/users.service'
import { UsersController } from '../v1/users/users.controller'
import { User, UserSchema } from '../v1/users/schemas/user.schema'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
  exports: [JwtModule]
})
export class AuthModule {}
