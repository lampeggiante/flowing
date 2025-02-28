import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { NotesModule } from './notes/notes.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    NotesModule,
    UsersModule,
    RouterModule.register([
      {
        path: 'v1',
        module: V1Module,
        children: [
          {
            path: 'notes',
            module: NotesModule
          },
          {
            path: 'users',
            module: UsersModule
          }
        ]
      }
    ])
  ]
})
export class V1Module {}
