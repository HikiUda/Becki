import {
    Controller,
    Get,
    Query,
    Req,
    UnauthorizedException,
    UseInterceptors,
} from '@nestjs/common';
import { LastUpdatedService } from './lastUpdated.service';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/user/auth';
import { LastUpdatedQueryDto } from './dto/lastUpdatedQuery.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { LastUpdatedMangaListDto } from './dto/lastUpdatedManga.dto';
import { LastUpdatedControllerInterface } from './interfaces/publicMangaController';

@Controller('last-updated')
export class LastUpdatedController implements LastUpdatedControllerInterface {
    constructor(private service: LastUpdatedService) {}

    @Get('manga')
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiOkResponse({
        type: LastUpdatedMangaListDto,
        description: "scope 'my' for authorized users only",
    })
    @ApiCustomUnauthorizedResponse()
    @UseInterceptors(AuthInterceptor)
    async getLastUpdatedManga(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: LastUpdatedQueryDto,
    ): Promise<LastUpdatedMangaListDto> {
        if (query.scope === 'my' && !req.user) throw new UnauthorizedException();
        return await this.service.getLastUpdatedManga(query, req.user?.id);
    }
}
