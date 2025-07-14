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
import { RefreshToken, ResponseAccessToken } from './dto/user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/loginUser.dto';
import { Cookies } from 'src/shared/decorators/cookie';
import { addRefreshCookie, RefreshCookieName } from './helpers/addRefreshCookie';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import {
    ApiCustomBadRequestResponse,
    ApiCustomUnauthorizedResponse,
} from 'src/shared/decorators/api40xResponses';

@Controller('auth')
export class AuthController implements AuthControllerInterface {
    constructor(private service: AuthService) {}

    @Post('registration')
    @ApiOkResponse({ type: ResponseAccessToken })
    @ApiCustomBadRequestResponse()
    async registration(
        @Body() body: CreateUserDto,
        @Res() res: Response,
    ): Promise<ResponseAccessToken> {
        const { access, refresh } = await this.service.registration(body);
        addRefreshCookie(res, refresh);
        res.status(HttpStatus.OK).json({ access });
        return { access };
    }

    @Post('login')
    @ApiOkResponse({ type: ResponseAccessToken })
    @ApiCustomBadRequestResponse()
    async login(@Body() body: LoginUserDto, @Res() res: Response): Promise<ResponseAccessToken> {
        const { access, refresh } = await this.service.login(body);
        addRefreshCookie(res, refresh);
        res.status(HttpStatus.OK).json({ access });
        return { access };
    }

    @Delete('logout')
    @ApiResponse({ status: 204 })
    @ApiCustomUnauthorizedResponse()
    async logout(
        @Cookies(RefreshCookieName) refresh: RefreshToken,
        @Res() res: Response,
    ): Promise<void> {
        if (!refresh) return;
        await this.service.logout(refresh);
        res.clearCookie(RefreshCookieName);
        res.status(HttpStatus.NO_CONTENT).send();
        return;
    }

    @Get('refresh')
    @ApiOkResponse({ type: ResponseAccessToken })
    @ApiCustomUnauthorizedResponse()
    async refresh(
        @Cookies(RefreshCookieName) token: RefreshToken,
        @Res() res: Response,
    ): Promise<ResponseAccessToken> {
        if (!token) throw new UnauthorizedException();
        const { access, refresh } = await this.service.refresh(token);
        addRefreshCookie(res, refresh);
        res.status(HttpStatus.OK).json({ access });
        return { access };
    }
}
