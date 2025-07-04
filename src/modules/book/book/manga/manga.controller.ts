import { Controller, Get, Param, Query } from '@nestjs/common';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { BookControllerInterface } from '../__common/interfaces/bookController';
import { MangaService } from './manga.service';
import { MangaIdParam } from '../../_common/model/bookId';
import { Manga } from './dto/manga.dto';
import { BookCoverList } from '../__common/dto/bookCovers.dto';

@Controller('manga/:mangaId')
export class MangaController implements BookControllerInterface {
    constructor(private service: MangaService) {}

    @Get()
    @ApiOkResponse({ type: Manga })
    @ApiCustomNotFoundResponse()
    async getBook(@Param() params: MangaIdParam, @Query() query: LangQuery): Promise<Manga> {
        return await this.service.getBook(params.mangaId, query.lang);
    }

    @Get('covers')
    @ApiOkResponse({ type: BookCoverList })
    async getBookCovers(@Param() params: MangaIdParam): Promise<BookCoverList> {
        return await this.service.getBookCovers(params.mangaId);
    }
}
