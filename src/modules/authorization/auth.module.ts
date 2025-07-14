import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { TokenService } from './jwt/token.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthConfigService } from './jwt/auth-config.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Global()
@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthRepository,
        TokenService,
        JwtStrategy,
        AuthConfigService,
        PrismaService,
    ],
    exports: [TokenService],
})
export class AuthorizationModule {}
