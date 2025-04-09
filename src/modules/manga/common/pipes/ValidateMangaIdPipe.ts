import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateMangaIdPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }
        const extractId = value.split('---').slice(-1);

        if (!Number.isNaN(Number(extractId))) {
            return Number(extractId);
        }
        throw new BadRequestException('Incorect manga id');
    }
}
