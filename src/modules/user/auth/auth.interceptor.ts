import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { toAuthUserDto } from './dto/toAuthUser.dto';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        try {
            if (token) {
                const secret = this.configService.get('ACCESS_TOKEN') || 'SECRET';
                const valideToken = await this.jwtService.verifyAsync(token, { secret });
                const user = toAuthUserDto(valideToken, valideToken.sub);
                request['user'] = user;
            }
        } catch {
            request['user'] = null;
        }
        return next.handle().pipe();
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers?.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
