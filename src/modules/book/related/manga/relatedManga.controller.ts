import { Controller, Get, Param, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { RelatedMangaService } from './relatedManga.service';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';
import { ApiOkResponse } from '@nestjs/swagger';
import { RelatedBookListDto } from '../__common/dto/relatedBook.dto';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';

@Controller('related-books/manga')
export class RelatedMangaController implements RelatedBookControllerInterface {
    constructor(private service: RelatedMangaService) {}

    @Get(':mangaId')
    @ApiOkResponse({
        type: RelatedBookListDto,
    })
    @ApiBookIdParam('mangaId')
    async getRelatedBooks(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Query() query: LangQueryDto,
    ): Promise<RelatedBookListDto> {
        return await this.service.getRelatedBooks(mangaId, query.lang);
    }
}
