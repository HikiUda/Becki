import { createZodDto } from '@anatine/zod-nestjs';
import { PeopleRole } from '@prisma/client';
import { z } from 'zod';

const UpdatePersonDescriptionSchema = z.object({
    ru: z.string().optional(),
    en: z.string().optional(),
});
export type UpdatePersonDescription = z.infer<typeof UpdatePersonDescriptionSchema>;

const UpdatePersonSchema = z.object({
    name: z.string().min(1).optional(),
    otherNames: z.string().array().optional(),
    role: z.nativeEnum(PeopleRole).array().optional(),
    description: UpdatePersonDescriptionSchema.optional(),
});
const ParseBodyUpdatePersonSchema = z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(UpdatePersonSchema);

export class UpdatePersonDto extends createZodDto(UpdatePersonSchema) {}
export class ParseBodyUpdatePersonDto extends createZodDto(ParseBodyUpdatePersonSchema) {}
