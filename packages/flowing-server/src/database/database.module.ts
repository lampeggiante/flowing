import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DatabaseService } from './database.service'
import { DbCommand } from './commands/db.command'
import { User, UserSchema } from '../v1/users/schemas/user.schema'
import { Note, NoteSchema } from '../v1/notes/schemas/note.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Note.name, schema: NoteSchema }
    ])
  ],
  providers: [DatabaseService, DbCommand],
  exports: [DatabaseService]
})
export class DatabaseModule {}
