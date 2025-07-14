import { AccessToken, AuthTokens, AuthUserDto, RefreshToken } from '../dto/user.dto';

export interface TokenServiceInterface {
    generateAccessToken: (payload: AuthUserDto) => Promise<AccessToken>;
    generateRefreshToken: (payload: AuthUserDto) => Promise<RefreshToken>;
    generateTokens: (userData: AuthUserDto) => Promise<AuthTokens>;
    validateAccessToken: (token: AccessToken) => Promise<AuthUserDto | null>;
    validateRefreshToken: (token: RefreshToken) => Promise<AuthUserDto | null>;
}
