import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const UserId = z.number().int().brand('UserId');
export type UserId = z.infer<typeof UserId>;

export const SessionId = z.number().int().brand('SessionId');
export type SessionId = z.infer<typeof SessionId>;

export type AuthUserData = {
    id: number;
    login: string;
    name: string;
    password: string;
};

export type AuthUserDto = {
    id: UserId;
    login: string;
    name: string;
    sessionId: SessionId;
};

export const AccessToken = z.string().brand('AccessToken');
export type AccessToken = z.infer<typeof AccessToken>;
export const RefreshToken = z.string().brand('RefreshToken');
export type RefreshToken = z.infer<typeof RefreshToken>;

export type AuthTokens = {
    access: AccessToken;
    refresh: RefreshToken;
};

export type AuthUserDtoValidateToken = AuthUserDto & {
    exp: number;
    iat: number;
};

export class ResponseAccessToken {
    @ApiProperty()
    access: AccessToken;
}

export interface AuthUserRequest extends Request {
    user: AuthUserDto;
}
export interface OptionalAuthUserRequest extends Request {
    user: AuthUserDto | null;
}
