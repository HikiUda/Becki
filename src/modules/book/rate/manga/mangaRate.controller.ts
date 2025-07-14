import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthUserRequest, AuthGuard } from 'src/modules/authorization';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { MangaRateService } from './mangaRate.service';
import { BookRateControllerInterface } from '../__common/interfaces/bookRateController';
import { MangaIdParam } from '../../_common/model/bookId';
import { SetUserBookRateDto } from '../__common/dto/setUserBookRate.dto';
import { UserBookRate } from '../__common/dto/userBookRate.dto';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(AuthGuard)
@Controller('manga/:mangaId/rate')
export class MangaRateController implements BookRateControllerInterface {
    constructor(private service: MangaRateService) {}

    @Get()
    @ApiOkResponse({ type: UserBookRate })
    async getRate(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
    ): Promise<UserBookRate> {
        return await this.service.getRate(params.mangaId, req.user.id);
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async setRate(
        @Req() req: AuthUserRequest,
        @Param() params: MangaIdParam,
        @Body() body: SetUserBookRateDto,
    ): Promise<void> {
        await this.service.setRate(params.mangaId, req.user.id, body.rate);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteRate(@Req() req: AuthUserRequest, @Param() params: MangaIdParam): Promise<void> {
        await this.service.deleteRate(params.mangaId, req.user.id);
        return;
    }
}
