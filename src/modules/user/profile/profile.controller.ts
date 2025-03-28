import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileControllerInterface } from './interfaces/profileController';
import { ProfileService } from './profile.service';
import { AuthUserRequest } from '../auth/types/user';
import { UserDataDto } from './dto/userData.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class ProfileController implements ProfileControllerInterface {
    constructor(private profileService: ProfileService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUserData(@Req() req: AuthUserRequest): Promise<UserDataDto> {
        return await this.profileService.getUserData(req.user.id);
    }
}
