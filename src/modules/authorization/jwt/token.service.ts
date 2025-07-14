import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from '../interfaces/tokenService';
import {
    AccessToken,
    AuthTokens,
    AuthUserDto,
    AuthUserDtoValidateToken,
    RefreshToken,
} from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from './auth-config.service';
import { toAuthUserDto } from '../helpers/toAuthUserDto';

@Injectable()
export class TokenService implements TokenServiceInterface {
    constructor(
        private jwtService: JwtService,
        private authConfigService: AuthConfigService,
    ) {}

    async generateAccessToken(payload: AuthUserDto): Promise<AccessToken> {
        const secret = this.authConfigService.getAccessTokenSecret;
        return (await this.jwtService.signAsync(payload, {
            secret,
            expiresIn: '15m',
        })) as AccessToken;
    }

    async generateRefreshToken(payload: AuthUserDto): Promise<RefreshToken> {
        const secret = this.authConfigService.getRefreshTokenSecret;
        return (await this.jwtService.signAsync(payload, {
            secret,
            expiresIn: '30d',
        })) as RefreshToken;
    }

    async generateTokens(userData: AuthUserDto): Promise<AuthTokens> {
        const access = await this.generateAccessToken(userData);
        const refresh = await this.generateRefreshToken(userData);
        return { access, refresh };
    }

    async validateAccessToken(token: AccessToken): Promise<AuthUserDto | null> {
        try {
            const secret = this.authConfigService.getAccessTokenSecret;
            const access: AuthUserDtoValidateToken = await this.jwtService.verifyAsync(token, {
                secret,
            });
            return toAuthUserDto(access, access.sessionId);
        } catch {
            return null;
        }
    }

    async validateRefreshToken(token: RefreshToken): Promise<AuthUserDto | null> {
        try {
            const secret = this.authConfigService.getRefreshTokenSecret;
            const refresh: AuthUserDtoValidateToken = await this.jwtService.verifyAsync(token, {
                secret,
            });
            return toAuthUserDto(refresh, refresh.sessionId);
        } catch {
            return null;
        }
    }
}
