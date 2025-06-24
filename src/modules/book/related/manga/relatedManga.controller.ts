import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { RelatedMangaService } from './relatedManga.service';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RelatedBookListDto } from '../__common/dto/relatedBook.dto';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { AddRelatedBooksDto } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';

@Controller('related-books/manga/:mangaId')
export class RelatedMangaController implements RelatedBookControllerInterface {
    constructor(private service: RelatedMangaService) {}

    @Get()
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

    @Post()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async addRelatedBooks(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Body() body: AddRelatedBooksDto,
    ): Promise<void> {
        await this.service.addRelatedBooks(mangaId, body.data);
        return;
    }

    @Patch()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async updateRelatedBooks(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Body() body: UpdateRelatedBookDto,
    ): Promise<void> {
        await this.service.updateRelatedBooks(mangaId, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async deleteRelatedBooks(
        @Param('mangaId', new ValidateBookIdPipe()) mangaId: number,
        @Body() body: DeleteRelatedBookDto,
    ): Promise<void> {
        await this.service.deleteRelatedBooks(mangaId, body);
        return;
    }
}
