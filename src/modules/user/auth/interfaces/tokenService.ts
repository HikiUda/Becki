import { AuthTokens, AuthUserDto, ValidateTokenReturnType } from '../types/user';

export interface TokenServiceInterface {
    generateAccessToken: (payload: AuthUserDto) => Promise<string>;
    generateRefreshToken: (payload: AuthUserDto) => Promise<string>;
    generateTokens: (userData: AuthUserDto) => Promise<AuthTokens>;
    validateRefreshToken: (token: string) => Promise<ValidateTokenReturnType | null>;
}
