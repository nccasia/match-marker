import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerService implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    next()
  }
}
