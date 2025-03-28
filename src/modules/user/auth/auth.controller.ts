import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
    ValidationPipe,
} from '@nestjs/common';
import { AuthControllerInterface } from './interfaces/authController';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ReturnAuthUser } from './types/user';
import { Response } from 'express';
import { LoginUserDto } from './dto/loginUser.dto';
import { Cookies } from 'src/common/decorators/cookie';
import { addRefreshCookie } from '../common/helpers/addRefreshCookie';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
    constructor(private authService: AuthService) {}
    @Post('registration')
    async registration(
        @Body(new ValidationPipe()) dto: CreateUserDto,
        @Res() res: Response,
    ): Promise<ReturnAuthUser> {
        const user = await this.authService.registration(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }
    @Post('login')
    async login(
        @Body(new ValidationPipe()) dto: LoginUserDto,
        @Res() res: Response,
    ): Promise<ReturnAuthUser> {
        const user = await this.authService.login(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }
    @Post('logout')
    async logout(@Cookies('refresh') refresh: string, @Res() res: Response): Promise<any> {
        if (!refresh) throw new BadRequestException('Нельзя выйте, сначала не войдя.');
        await this.authService.logout(refresh);
        res.clearCookie('refresh');
        res.status(HttpStatus.OK).send();
        return;
    }
    @Get('refresh')
    async refresh(
        @Cookies('refresh') refresh: string,
        @Res() res: Response,
    ): Promise<ReturnAuthUser> {
        if (!refresh) throw new UnauthorizedException();
        const user = await this.authService.refresh(refresh);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }
}
