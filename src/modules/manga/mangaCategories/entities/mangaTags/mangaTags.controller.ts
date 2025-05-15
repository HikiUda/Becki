import { Controller, Get, Query } from '@nestjs/common';
import { MangaTagsControllerInterface } from './interfaces/mangaTagsController';
import { MangaTagsService } from './mangaTags.service';
import { CategoriesResponseArrayData } from '../../dto/category.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { GetCategoryQuery } from '../../dto/getCategoryQuery';

@Controller('manga/tags')
export class MangaTagsController implements MangaTagsControllerInterface {
    constructor(private mangaTagsService: MangaTagsService) {}

    @Get()
    @ApiOkResponse({ type: CategoriesResponseArrayData })
    async getTags(@Query() query: GetCategoryQuery): Promise<CategoriesResponseArrayData> {
        return await this.mangaTagsService.getTags(query.search, query.lang);
    }
}
