import { Controller, Get, Query } from '@nestjs/common';
import { MangaTagsControllerInterface } from './interfaces/mangaTagsController';
import { MangaTagsService } from './mangaTags.service';
import { CategoriesResponseArrayData } from '../../dto/category.dto';
import { ApiResponse } from '@nestjs/swagger';
import { mockCategoriesResponseArrayData } from '../../mock/mockCategories';
import { GetCategoryQuery } from '../../dto/getCategoryQuery';

@Controller('manga/tags')
export class MangaTagsController implements MangaTagsControllerInterface {
    constructor(private mangaTagsService: MangaTagsService) {}

    @Get()
    @ApiResponse({ example: mockCategoriesResponseArrayData })
    async getTags(@Query() query: GetCategoryQuery): Promise<CategoriesResponseArrayData> {
        return await this.mangaTagsService.getTags(query.search, query.lang);
    }
}
