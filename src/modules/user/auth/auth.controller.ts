import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Post,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthControllerInterface } from './interfaces/authController';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ReturnAuthUser } from './types/user';
import { Response } from 'express';
import { LoginUserDto } from './dto/loginUser.dto';
import { Cookies } from 'src/common/decorators/cookie';
//TODO inside module
import { addRefreshCookie } from './helpers/addRefreshCookie';
import { ApiResponse } from '@nestjs/swagger';
import { mockAuthUser } from './mock/mockAuthUser';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
    constructor(private authService: AuthService) {}

    @ApiResponse({ example: mockAuthUser, status: 200 })
    @Post('registration')
    async registration(@Body() dto: CreateUserDto, @Res() res: Response): Promise<ReturnAuthUser> {
        const user = await this.authService.registration(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }
    @ApiResponse({ example: mockAuthUser, status: 200 })
    @Post('login')
    async login(@Body() dto: LoginUserDto, @Res() res: Response): Promise<ReturnAuthUser> {
        const user = await this.authService.login(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }

    @Delete('logout')
    async logout(@Cookies('refresh') refresh: string, @Res() res: Response): Promise<any> {
        if (!refresh) throw new BadRequestException('Нельзя выйте, сначала не войдя.');
        await this.authService.logout(refresh);
        res.clearCookie('refresh');
        res.status(HttpStatus.OK).send();
        return;
    }
    @ApiResponse({ example: mockAuthUser, status: 200 })
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
