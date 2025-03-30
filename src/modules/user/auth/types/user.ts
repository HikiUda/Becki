export interface AuthDataUser {
    id: number;
    login: string;
    name: string;
    password: string;
}
export interface AuthUserDto extends Omit<AuthDataUser, 'password'> {
    sub: number;
}

export interface AuthTokens {
    access: string;
    refresh: string;
}

export interface ValidateTokenReturnType extends AuthUserDto {
    exp: number;
    iat: number;
}

export interface ReturnAuthUser {
    user: AuthUserDto;
    tokens: AuthTokens;
}

export interface AuthUserRequest extends Request {
    user: AuthUserDto;
}
export interface OptionalAuthUserRequest extends Request {
    user: AuthUserDto | null;
}
