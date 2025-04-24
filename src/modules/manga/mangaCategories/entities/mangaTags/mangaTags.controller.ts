import { Controller, Get, Query } from '@nestjs/common';
import { MangaTagsControllerInterface } from './interfaces/mangaTagsController';
import { MangaTagsService } from './mangaTags.service';
import { CategoryDto } from '../../dto/category.dto';
import { ApiResponse } from '@nestjs/swagger';
import { mockCategories } from '../../mock/mockCategories';
import { GetCategoryQuery } from '../../dto/getCategoryQuery';

@Controller('manga/tags')
export class MangaTagsController implements MangaTagsControllerInterface {
    constructor(private mangaTagsService: MangaTagsService) {}

    @Get()
    @ApiResponse({ example: mockCategories })
    async getTags(@Query() query: GetCategoryQuery): Promise<CategoryDto[]> {
        return await this.mangaTagsService.getTags(query.search, query.lang);
    }
}
