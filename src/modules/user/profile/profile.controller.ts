import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileControllerInterface } from './interfaces/profileController';
import { ProfileService } from './profile.service';
import { AuthUserRequest } from '../../authorization/dto/user.dto';
import { UserDataDto } from './dto/userData.dto';
import { AuthGuard } from '../../authorization/jwt/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
    ApiCustomBadRequestResponse,
    ApiCustomUnauthorizedResponse,
} from 'src/shared/decorators/api40xResponses';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(AuthGuard)
@Controller('user')
export class ProfileController implements ProfileControllerInterface {
    constructor(private service: ProfileService) {}

    @Get()
    @ApiOkResponse({
        type: UserDataDto,
        description: 'User id get from token',
    })
    @ApiCustomBadRequestResponse()
    async getUserData(@Req() req: AuthUserRequest): Promise<UserDataDto> {
        return await this.service.getUserData(req.user.id);
    }

    @Patch('json-settings')
    @ApiOkResponse({
        schema: {
            type: 'object',
            additionalProperties: true,
        },
    })
    @ApiBody({
        schema: {
            type: 'object',
            additionalProperties: true,
        },
    })
    async updateJsonSettings(@Req() req: AuthUserRequest, @Body() body: object): Promise<void> {
        await this.service.updateJsonSettings(req.user.id, body);
        return;
    }
}
