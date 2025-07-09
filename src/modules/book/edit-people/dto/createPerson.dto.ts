import { createZodDto } from '@anatine/zod-nestjs';
import { PeopleRole } from '@prisma/client';
import { z } from 'zod';

const CreatePersonSchema = z.object({
    name: z.string().min(1),
    otherNames: z.string().array().optional(),
    role: z.nativeEnum(PeopleRole),
    decription: z
        .object({
            ru: z.string(),
            en: z.string().optional(),
        })
        .default({ ru: '' }),
});
const ParseBodyCreatePersonSchema = z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(CreatePersonSchema);

export class CreatePersonDto extends createZodDto(CreatePersonSchema) {}
export class ParseBodyCreatePersonDto extends createZodDto(ParseBodyCreatePersonSchema) {}
