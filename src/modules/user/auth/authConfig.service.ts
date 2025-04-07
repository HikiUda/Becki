import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
    constructor(private configService: ConfigService) {}

    get getRefreshTokenSecret(): string {
        // 'SECRET' never be pass because zod works
        return this.configService.get('REFRESH_TOKEN_SECRET') || 'SECRET';
    }
    get getAccessTokenSecret(): string {
        // 'SECRET' never be pass because zod works
        return this.configService.get('ACCESS_TOKEN_SECRET') || 'SECRET';
    }
}
