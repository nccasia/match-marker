import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common'
import { TransformPipe } from '../filter/transform.pipe'
import { HttpAdapterHost, Reflector } from '@nestjs/core'
import { AllExceptionsFilter } from '../filter/exception.filter'

export const appConfig = (app: INestApplication) => {
  app.enableCors({ origin: '*' })

  // Filter out unwanted fields in request
  app.useGlobalPipes(
    new TransformPipe(),
  )

  // Filter out @Exclude() fields to reponse
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
}
