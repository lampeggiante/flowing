import { Module } from '@nestjs/common'
import { V1Module } from './v1/v1.module'
// import { MongooseModule } from '@nestjs/mongoose'
// import { DatabaseModule } from './database/database.module'
// import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: ['.env.development', '.env']
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI')
    //   }),
    //   inject: [ConfigService]
    // }),
    // DatabaseModule,
    V1Module
  ]
})
export class AppModule {}
