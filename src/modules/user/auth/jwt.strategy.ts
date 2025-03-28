import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidateTokenReturnType } from './types/user';
import { toAuthUserDto } from './dto/toAuthUser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('ACCESS_TOKEN') || 'SECRET',
        });
    }

    validate(payload: ValidateTokenReturnType) {
        return toAuthUserDto(payload, payload.sub);
    }
}
