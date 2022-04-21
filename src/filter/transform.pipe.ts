import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from "class-transformer";

@Injectable()
export class TransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return plainToClass(metadata.metatype, value);
  }
}