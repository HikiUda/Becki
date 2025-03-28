import { Injectable } from '@nestjs/common';
import { TokenServiceInterface } from './interfaces/tokenService';
import { AuthTokens, AuthUserDto, ValidateTokenReturnType } from './types/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService implements TokenServiceInterface {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    async generateAccessToken(payload: AuthUserDto): Promise<string> {
        const secret = this.configService.get('ACCESS_TOKEN') || 'SECRET';
        return await this.jwtService.signAsync(payload, { secret, expiresIn: '1h' });
    }
    async generateRefreshToken(payload: AuthUserDto): Promise<string> {
        const secret = this.configService.get('REFRESH_TOKEN') || 'SECRET';
        return await this.jwtService.signAsync(payload, { secret, expiresIn: '30d' });
    }
    async generateTokens(userData: AuthUserDto): Promise<AuthTokens> {
        const access = await this.generateAccessToken(userData);
        const refresh = await this.generateRefreshToken(userData);
        return { access, refresh };
    }
    async validateRefreshToken(token: string): Promise<ValidateTokenReturnType | null> {
        try {
            const secret = this.configService.get('REFRESH_TOKEN') || 'SECRET';
            const refresh = await this.jwtService.verifyAsync(token, { secret });
            return refresh;
        } catch {
            return null;
        }
    }
}
