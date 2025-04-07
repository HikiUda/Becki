import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ValidateTokenReturnType } from './types/user';
import { toAuthUserDto } from './helpers/toAuthUserDto';
import { AuthConfigService } from './authConfig.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(authConfigService: AuthConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.getAccessTokenSecret,
        });
    }

    validate(payload: ValidateTokenReturnType) {
        return toAuthUserDto(payload, payload.sub);
    }
}
