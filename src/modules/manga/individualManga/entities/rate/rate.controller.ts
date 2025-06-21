import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { RateControllerInterface } from './interfaces/rateController';
import { RateService } from './rate.service';
import { SetUserMangaRateDto, UserMangaRateDto } from './dto/userMangaRate.dto';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ValidateMangaIdPipe } from 'src/modules/manga/common/pipes/ValidateMangaIdPipe';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ApiMangaIdParam } from 'src/modules/manga/common/decorators/ApiMangaIdParam/ApiMangaIdParam';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';

@ApiBearerAuth()
@ApiMangaIdParam()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('manga/byId/:id/rate')
export class RateController implements RateControllerInterface {
    constructor(private rateService: RateService) {}
    @Get()
    @ApiOkResponse({ type: UserMangaRateDto })
    async getUserMangaRate(
        @Req() req: AuthUserRequest,
        @Param('id', new ValidateMangaIdPipe()) id: number,
    ): Promise<UserMangaRateDto> {
        return await this.rateService.getUserMangaRate(id, req.user.id);
    }
    @Patch()
    @ApiOkResponse({ type: UserMangaRateDto })
    async setUserMangaRate(
        @Req() req: AuthUserRequest,
        @Param('id', new ValidateMangaIdPipe()) id: number,
        @Body() body: SetUserMangaRateDto,
    ): Promise<UserMangaRateDto> {
        return await this.rateService.setUserMangaRate(id, req.user.id, body.rate);
    }
}
