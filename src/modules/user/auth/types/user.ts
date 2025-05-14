import { ApiProperty } from '@nestjs/swagger';

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

export interface AuthUserRequest extends Request {
    user: AuthUserDto;
}
export interface OptionalAuthUserRequest extends Request {
    user: AuthUserDto | null;
}
