import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { LangQueryDto } from 'src/shared/dto/query/langQuery.dto';
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { AddRelatedBooksDto } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';
import { RelatedRanobeService } from './relatedRanobe.service';

@Controller('related-books/ranobe/:ranobeId')
export class RelatedRanobeController implements RelatedBookControllerInterface {
    constructor(private service: RelatedRanobeService) {}

    @Get()
    @ApiOkResponse({
        type: RelatedBookDtoList,
    })
    @ApiBookIdParam('ranobeId')
    async getRelatedBooks(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Query() query: LangQueryDto,
    ): Promise<RelatedBookDtoList> {
        return await this.service.getRelatedBooks(bookId, query.lang);
    }

    @Post()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('ranobeId')
    async addBookRelated(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: AddRelatedBooksDto,
    ): Promise<void> {
        await this.service.addBookRelated(bookId, body.data);
        return;
    }

    @Patch()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('ranobeId')
    async updateBookRelated(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: UpdateRelatedBookDto,
    ): Promise<void> {
        await this.service.updateBookRelated(bookId, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    @ApiBookIdParam('ranobeId')
    async deleteBookRelated(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: DeleteRelatedBookDto,
    ): Promise<void> {
        await this.service.deleteBookRelated(bookId, body);
        return;
    }
}
