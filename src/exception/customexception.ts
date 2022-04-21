import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomException extends HttpException {
  private readonly errorCode: number

  constructor(code: number, msg: string) {
    super(msg, HttpStatus.INTERNAL_SERVER_ERROR)
    this.errorCode = code
  }

  getErrorCode() {
    return this.errorCode
  }
}
