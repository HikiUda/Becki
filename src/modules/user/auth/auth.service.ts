import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceInterface } from './interfaces/authService';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { AuthUserDto, ReturnAuthUser } from './types/user';
import { TokenService } from './token.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { toAuthUserDto } from './helpers/toAuthUserDto';

@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(
        private authRepository: AuthRepository,
        private tokenService: TokenService,
    ) {}

    async registration(dto: CreateUserDto): Promise<ReturnAuthUser> {
        const userExists = await this.authRepository.getAuthUser(dto.login);
        if (userExists)
            throw new BadRequestException('Пользователь с таким логином уже существует');
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.authRepository.createUser({ ...dto, password: hashPassword });
        const sessionId = await this.authRepository.createSession(user.id);
        const userDto = toAuthUserDto(user, sessionId);
        return await this.generateSaveTokenAndReturnAuthUser(userDto);
    }
    async login(dto: LoginUserDto): Promise<ReturnAuthUser> {
        const user = await this.authRepository.getAuthUser(dto.login);
        if (!user) throw new BadRequestException('Такого пользователя не существует.');
        const passwordEqual = await bcrypt.compare(dto.password, user.password);
        if (!passwordEqual) throw new BadRequestException('Неправильный пароль.');
        const sessionId = await this.authRepository.createSession(user.id);
        const userDto = toAuthUserDto(user, sessionId);
        return await this.generateSaveTokenAndReturnAuthUser(userDto);
    }

    async logout(refresh: string): Promise<ReturnAuthUser> {
        const validRefresh = await this.tokenService.validateRefreshToken(refresh);
        if (!validRefresh) throw new UnauthorizedException();
        return await this.authRepository.removeSession(validRefresh.sub);
    }
    async refresh(refresh: string): Promise<ReturnAuthUser> {
        const validRefresh = await this.tokenService.validateRefreshToken(refresh);
        if (!validRefresh) throw new UnauthorizedException();
        const validSession = await this.authRepository.getSession(validRefresh.sub);
        if (!validSession || validSession !== refresh) throw new UnauthorizedException();
        const userDto = toAuthUserDto(validRefresh, validRefresh.sub);
        return this.generateSaveTokenAndReturnAuthUser(userDto);
    }
    async generateSaveTokenAndReturnAuthUser(user: AuthUserDto): Promise<ReturnAuthUser> {
        const tokens = await this.tokenService.generateTokens(user);
        await this.authRepository.saveAuthTokens(tokens.refresh, user.sub);
        return { user, tokens };
    }
}
