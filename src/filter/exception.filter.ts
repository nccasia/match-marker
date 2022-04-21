import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    if (exception instanceof HttpException) {
      if (exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR) {
        return response.status(exception.getStatus()).json({
          path: request.url,
          statusCode: exception.getStatus(),
          timestamp: new Date().toISOString(),
          message: exception['message'],
        })
      }
    } else {
      const { message, stack } = exception as { message: unknown; stack: unknown }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        path: request.url,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        message,
        stack,
      })
    }

    super.catch(exception, host)
  }
}
