import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): unknown {
        return JSON.parse(value);
    }
}
