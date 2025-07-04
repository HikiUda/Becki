import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthUserRequest, JwtAuthGuard } from 'src/modules/user/auth';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { BookRateControllerInterface } from '../__common/interfaces/bookRateController';
import { RanobeIdParam } from '../../_common/model/bookId';
import { SetUserBookRateDto } from '../__common/dto/setUserBookRate.dto';
import { UserBookRate } from '../__common/dto/userBookRate.dto';
import { RanobeRateService } from './ranobeRate.service';

@ApiBearerAuth()
@ApiCustomUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@Controller('ranobe/:ranobeId/rate')
export class RanobeRateController implements BookRateControllerInterface {
    constructor(private service: RanobeRateService) {}

    @Get()
    @ApiOkResponse({ type: UserBookRate })
    async getRate(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
    ): Promise<UserBookRate> {
        return await this.service.getRate(params.ranobeId, req.user.id);
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async setRate(
        @Req() req: AuthUserRequest,
        @Param() params: RanobeIdParam,
        @Body() body: SetUserBookRateDto,
    ): Promise<void> {
        await this.service.setRate(params.ranobeId, req.user.id, body.rate);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteRate(@Req() req: AuthUserRequest, @Param() params: RanobeIdParam): Promise<void> {
        await this.service.deleteRate(params.ranobeId, req.user.id);
        return;
    }
}
