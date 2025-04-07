import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const LoginUserScheme = z.object({
    login: z.string().nonempty(),
    password: z.string().nonempty(),
});

export class LoginUserDto extends createZodDto(LoginUserScheme) {}
