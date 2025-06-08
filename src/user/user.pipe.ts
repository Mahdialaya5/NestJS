
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class userPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    return value;
  }
}
