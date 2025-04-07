import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { toAuthUserDto } from './helpers/toAuthUserDto';
import { TokenService } from './token.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(private tokenService: TokenService) {}
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (token) {
            const valideToken = await this.tokenService.validateAccessToken(token);
            if (valideToken) {
                const user = toAuthUserDto(valideToken, valideToken.sub);
                request['user'] = user;
                return next.handle().pipe();
            }
        }
        request['user'] = null;
        return next.handle().pipe();
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers?.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
