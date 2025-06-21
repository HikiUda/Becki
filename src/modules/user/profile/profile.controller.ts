import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileControllerInterface } from './interfaces/profileController';
import { ProfileService } from './profile.service';
import { AuthUserRequest } from '../auth/types/user';
import { UserDataDto } from './dto/userData.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';

@Controller('user')
export class ProfileController implements ProfileControllerInterface {
    constructor(private profileService: ProfileService) {}

    @Get()
    @ApiOkResponse({
        type: UserDataDto,
        description: 'User id get from token',
    })
    @ApiBearerAuth()
    @ApiCustomUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    async getUserData(@Req() req: AuthUserRequest): Promise<UserDataDto> {
        return await this.profileService.getUserData(req.user.id);
    }
}
