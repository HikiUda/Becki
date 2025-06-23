import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { z } from 'zod';

export const transformBookId = z
    .string()
    .transform((value) => {
        if (!Number.isNaN(Number(value))) {
            return Number(value);
        }
        const extractId = value.split('---').slice(-1);

        if (!Number.isNaN(Number(extractId))) {
            return Number(extractId);
        }
        throw new BadRequestException('Incorect manga id');
    })
    .pipe(z.number().int());

@Injectable()
export class ValidateBookIdPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        return transformBookId.parse(value);
    }
}
