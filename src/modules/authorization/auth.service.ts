import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/authService';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { AuthTokens, AuthUserDto, RefreshToken, UserId } from './dto/user.dto';
import { TokenService } from './jwt/token.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { toAuthUserDto } from './helpers/toAuthUserDto';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private repository: AuthRepository,
        private tokenService: TokenService,
    ) {}

    async registration(data: CreateUserDto): Promise<AuthTokens> {
        const userExists = await this.repository.getAuthUser(data.login);
        if (userExists)
            throw new BadRequestException('Пользователь с таким логином уже существует');

        //TODO get solt from config
        const hashPassword = await bcrypt.hash(data.password, 10);
        const user = await this.repository.createUser({ ...data, password: hashPassword });
        const sessionId = await this.repository.createSession(user.id as UserId);
        const userDto = toAuthUserDto(user, sessionId);
        return await this.generateTokens(userDto);
    }

    async login(data: LoginUserDto): Promise<AuthTokens> {
        const user = await this.repository.getAuthUser(data.login);
        if (!user) throw new BadRequestException('Такого пользователя не существует.');

        const passwordEqual = await bcrypt.compare(data.password, user.password);
        if (!passwordEqual) throw new BadRequestException('Неправильный пароль.');

        const sessionId = await this.repository.createSession(user.id as UserId);
        const userDto = toAuthUserDto(user, sessionId);
        return await this.generateTokens(userDto);
    }

    async logout(token: RefreshToken): Promise<void> {
        const validRefresh = await this.tokenService.validateRefreshToken(token);
        if (!validRefresh) throw new UnauthorizedException();
        await this.repository.removeSession(validRefresh.sessionId);
        return;
    }

    async refresh(token: RefreshToken): Promise<AuthTokens> {
        const validRefresh = await this.tokenService.validateRefreshToken(token);
        if (!validRefresh) throw new UnauthorizedException();

        const validSession = await this.repository.getSession(validRefresh.sessionId);
        if (!validSession || validSession !== token) throw new UnauthorizedException();

        return await this.generateTokens(validRefresh);
    }

    private async generateTokens(user: AuthUserDto): Promise<AuthTokens> {
        const tokens = await this.tokenService.generateTokens(user);
        await this.repository.saveAuthTokens(tokens.refresh, user.sessionId);
        return tokens;
    }

    @Interval(5000)
    private async clearSessions() {
        await this.repository.clearSessions();
        return;
    }
}
