import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthUserDtoValidateToken } from '../dto/user.dto';
import { toAuthUserDto } from '../helpers/toAuthUserDto';
import { AuthConfigService } from './auth-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(authConfigService: AuthConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConfigService.getAccessTokenSecret,
        });
    }

    validate(payload: AuthUserDtoValidateToken) {
        return toAuthUserDto(payload, payload.sessionId);
    }
}
