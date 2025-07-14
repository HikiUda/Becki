import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const CreateUserSchema = z.object({
    login: z.string().nonempty().max(64),
    password: z.string().min(10).max(64),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
