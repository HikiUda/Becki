import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RelatedBookControllerInterface } from '../__common/interfaces/relatedBookController';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { RelatedBookDtoList } from '../__common/dto/relatedBook.dto';
import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { AddRelatedBooksDto } from '../__common/dto/addRelatedBooks.dto';
import { UpdateRelatedBookDto, DeleteRelatedBookDto } from '../__common/dto/mutateRelatedBook.dto';
import { RelatedRanobeService } from './relatedRanobe.service';
import { RanobeIdParam } from '../../_common/model/bookId';

@Controller('related-books/ranobe/:ranobeId')
export class RelatedRanobeController implements RelatedBookControllerInterface {
    constructor(private service: RelatedRanobeService) {}

    @Get()
    @ApiOkResponse({
        type: RelatedBookDtoList,
    })
    async getRelatedBooks(
        @Param() params: RanobeIdParam,
        @Query() query: LangQuery,
    ): Promise<RelatedBookDtoList> {
        return await this.service.getRelatedBooks(params.ranobeId, query.lang);
    }

    @Post()
    @ApiResponse({ status: 204 })
    async addBookRelated(
        @Param() params: RanobeIdParam,
        @Body() body: AddRelatedBooksDto,
    ): Promise<void> {
        await this.service.addBookRelated(params.ranobeId, body.data);
        return;
    }

    @Patch()
    @ApiResponse({ status: 204 })
    async updateBookRelated(
        @Param() params: RanobeIdParam,
        @Body() body: UpdateRelatedBookDto,
    ): Promise<void> {
        await this.service.updateBookRelated(params.ranobeId, body);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteBookRelated(
        @Param() params: RanobeIdParam,
        @Body() body: DeleteRelatedBookDto,
    ): Promise<void> {
        await this.service.deleteBookRelated(params.ranobeId, body);
        return;
    }
}
