import { HttpException, HttpStatus } from '@nestjs/common'

export class BadRequestException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST)
  }
}
