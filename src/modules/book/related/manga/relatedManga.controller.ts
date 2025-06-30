import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { RelatedMangaService } from './relatedManga.service';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { AddRelatedBooksDto } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';

@Controller('related-books/manga/:mangaId')
export class RelatedMangaController implements RelatedBookControllerInterface {
    constructor(private service: RelatedMangaService) {}

    @Get()
    @ApiOkResponse({
        type: RelatedBookDtoList,
    })
    @ApiBookIdParam('mangaId')
    async getRelatedBooks(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: LangQueryDto,
    ): Promise<RelatedBookDtoList> {
        return await this.service.getRelatedBooks(bookId, query.lang);
    }

    @Post()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async addBookRelated(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: AddRelatedBooksDto,
    ): Promise<void> {
        await this.service.addBookRelated(bookId, body.data);
        return;
    }

    @Patch()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async updateBookRelated(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: UpdateRelatedBookDto,
    ): Promise<void> {
        await this.service.updateBookRelated(bookId, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('mangaId')
    async deleteBookRelated(
        @Param('mangaId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: DeleteRelatedBookDto,
    ): Promise<void> {
        await this.service.deleteBookRelated(bookId, body);
        return;
    }
}
