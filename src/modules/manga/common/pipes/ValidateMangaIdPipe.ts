import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidateMangaIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }
        return value;
    }
}
