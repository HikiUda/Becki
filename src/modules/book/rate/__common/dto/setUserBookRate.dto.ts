import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const SetUserBookRateSchema = z.object({
    rate: z.number().int().min(1).max(10),
});
export class SetUserBookRateDto extends createZodDto(SetUserBookRateSchema) {}
