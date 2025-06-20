import {
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
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/common/decorators/api40xResponses';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
    constructor(private authService: AuthService) {}

    @ApiOkResponse({ type: ReturnAuthUser })
    @Post('registration')
    async registration(@Body() dto: CreateUserDto, @Res() res: Response): Promise<ReturnAuthUser> {
        const user = await this.authService.registration(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }
    @ApiOkResponse({ type: ReturnAuthUser })
    @Post('login')
    async login(@Body() dto: LoginUserDto, @Res() res: Response): Promise<ReturnAuthUser> {
        const user = await this.authService.login(dto);
        addRefreshCookie(res, user.tokens.refresh);
        res.status(HttpStatus.OK).json(user);
        return user;
    }

    @Delete('logout')
    @ApiResponse({ type: ReturnAuthUser, status: 204 })
    async logout(@Cookies('refresh') refresh: string, @Res() res: Response): Promise<any> {
        if (!refresh) return;
        await this.authService.logout(refresh);
        res.clearCookie('refresh');
        res.status(HttpStatus.OK).send();
        return;
    }

    @Get('refresh')
    @ApiOkResponse({ type: ReturnAuthUser })
    @ApiCustomUnauthorizedResponse()
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
