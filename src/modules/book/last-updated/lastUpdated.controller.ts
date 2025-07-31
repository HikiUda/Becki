import {
    Controller,
    Get,
    Query,
    Req,
    UnauthorizedException,
    UseInterceptors,
} from '@nestjs/common';
import { LastUpdatedService } from './lastUpdated.service';
import { AuthInterceptor, OptionalAuthUserRequest } from 'src/modules/authorization';
import { LastUpdatedQuery } from './dto/lastUpdatedQuery.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponse } from 'src/shared/decorators/api40xResponses';
import { LastUpdatedMangaList } from './dto/lastUpdatedManga.dto';
import { LastUpdatedControllerInterface } from './interfaces/publicMangaController';
import { LastUpdatedRanobeList } from './dto/lastUpdatedRanobe.dto';

@Controller('last-updated')
export class LastUpdatedController implements LastUpdatedControllerInterface {
    constructor(private service: LastUpdatedService) {}

    @Get('manga')
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiOkResponse({
        type: LastUpdatedMangaList,
        description: "scope 'my' for authorized users only",
    })
    @ApiCustomUnauthorizedResponse()
    @UseInterceptors(AuthInterceptor)
    async getLastUpdatedManga(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: LastUpdatedQuery,
    ): Promise<LastUpdatedMangaList> {
        if (query.scope === 'my' && !req.user) throw new UnauthorizedException();
        return await this.service.getLastUpdatedManga(query, req.user?.id);
    }

    @Get('ranobe')
    @ApiOperation({ summary: 'Optional auth endpoint' })
    @ApiBearerAuth()
    @ApiOkResponse({
        type: LastUpdatedRanobeList,
        description: "scope 'my' for authorized users only",
    })
    @ApiCustomUnauthorizedResponse()
    @UseInterceptors(AuthInterceptor)
    async getLastUpdatedRanobe(
        @Req() req: OptionalAuthUserRequest,
        @Query() query: LastUpdatedQuery,
    ): Promise<LastUpdatedRanobeList> {
        if (query.scope === 'my' && !req.user) throw new UnauthorizedException();
        return await this.service.getLastUpdatedRanobe(query, req.user?.id);
    }
}
