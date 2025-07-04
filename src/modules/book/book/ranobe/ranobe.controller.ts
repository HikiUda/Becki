import { Controller, Get, Param, Query } from '@nestjs/common';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { BookControllerInterface } from '../__common/interfaces/bookController';
import { RanobeIdParam } from '../../_common/model/bookId';
import { Ranobe } from './dto/ranobe.dto';
import { BookCoverList } from '../__common/dto/bookCovers.dto';
import { RanobeService } from './ranobe.service';

@Controller('ranobe/:ranobeId')
export class RanobeController implements BookControllerInterface {
    constructor(private service: RanobeService) {}

    @Get()
    @ApiOkResponse({ type: Ranobe })
    @ApiCustomNotFoundResponse()
    async getBook(@Param() params: RanobeIdParam, @Query() query: LangQuery): Promise<Ranobe> {
        return await this.service.getBook(params.ranobeId, query.lang);
    }

    @Get('covers')
    @ApiOkResponse({ type: BookCoverList })
    async getBookCovers(@Param() params: RanobeIdParam): Promise<BookCoverList> {
        return await this.service.getBookCovers(params.ranobeId);
    }
}
