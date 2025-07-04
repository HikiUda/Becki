import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { RelatedMangaService } from './relatedManga.service';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { AddRelatedBooksDto } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';
import { MangaIdParam } from '../../_common/model/bookId';

@Controller('related-books/manga/:mangaId')
export class RelatedMangaController implements RelatedBookControllerInterface {
    constructor(private service: RelatedMangaService) {}

    @Get()
    @ApiOkResponse({
        type: RelatedBookDtoList,
    })
    async getRelatedBooks(
        @Param() params: MangaIdParam,
        @Query() query: LangQuery,
    ): Promise<RelatedBookDtoList> {
        return await this.service.getRelatedBooks(params.mangaId, query.lang);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async addBookRelated(
        @Param() params: MangaIdParam,
        @Body() body: AddRelatedBooksDto,
    ): Promise<void> {
        await this.service.addBookRelated(params.mangaId, body.data);
        return;
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async updateBookRelated(
        @Param() params: MangaIdParam,
        @Body() body: UpdateRelatedBookDto,
    ): Promise<void> {
        await this.service.updateBookRelated(params.mangaId, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteBookRelated(
        @Param() params: MangaIdParam,
        @Body() body: DeleteRelatedBookDto,
    ): Promise<void> {
        await this.service.deleteBookRelated(params.mangaId, body);
        return;
    }
}
