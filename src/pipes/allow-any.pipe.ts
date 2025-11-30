import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class AllowAnyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Simply return the value without any validation or transformation
    return value;
  }
}
