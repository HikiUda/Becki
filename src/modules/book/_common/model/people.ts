import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const PersonId = z.number().int().brand('PersonId');
export type PersonId = z.infer<typeof PersonId>;

export const PersonIdParamSchema = z.object({
    personId: z.coerce.number().pipe(PersonId),
});
export class PersonIdParam extends createZodDto(PersonIdParamSchema) {}
