import { Command, Positional } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database.service'

@Injectable()
export class DbCommand {
  constructor(private readonly databaseService: DatabaseService) {}

  @Command({
    command: 'db:init',
    describe: '初始化数据库'
  })
  async init() {
    await this.databaseService.initializeDatabase()
    console.log('数据库初始化完成')
  }

  @Command({
    command: 'db:clear',
    describe: '清理数据库（仅开发环境）'
  })
  async clear() {
    await this.databaseService.clearDatabase()
    console.log('数据库已清理')
  }
}
