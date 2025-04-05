import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // 检查路由是否是公开的
    const isPublic = this.reflector.get('isPublic', req.route)
    if (isPublic) {
      return next()
    }

    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new UnauthorizedException('No token provided')
    }

    try {
      const token = authHeader.split(' ')[1]
      const decoded = await this.jwtService.verify(token)
      req['user'] = decoded
      next()
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
