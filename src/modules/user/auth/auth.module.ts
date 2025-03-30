import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, TokenService, JwtStrategy],
})
export class AuthModule {}
