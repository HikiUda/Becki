import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const UserId = z.number().int().brand('UserId');
export type UserId = z.infer<typeof UserId>;

export interface AuthDataUser {
    id: number;
    login: string;
    name: string;
    password: string;
}

export class AuthUserDto implements Omit<AuthDataUser, 'password'> {
    @ApiProperty()
    id: number;
    @ApiProperty()
    login: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    sub: number;
}

export class AuthTokens {
    @ApiProperty()
    access: string;
    @ApiProperty()
    refresh: string;
}

export interface ValidateTokenReturnType extends AuthUserDto {
    exp: number;
    iat: number;
}

export class ReturnAuthUser {
    @ApiProperty()
    user: AuthUserDto;
    @ApiProperty()
    tokens: AuthTokens;
}

export type AuthUser = {
    id: UserId;
    login: string;
    name: string;
    sub: number;
};

export interface AuthUserRequest extends Request {
    user: AuthUser;
}
export interface OptionalAuthUserRequest extends Request {
    user: AuthUser | null;
}
