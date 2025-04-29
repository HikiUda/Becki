import { Controller, Get, Query } from '@nestjs/common';
import { MangaGenresControllerInterface } from './interfaces/mangaGenresController';
import { MangaGenresService } from './mangaGenres.service';
import { CategoriesResponseArrayData } from '../../dto/category.dto';
import { mockCategoriesResponseArrayData } from '../../mock/mockCategories';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoryQuery } from '../../dto/getCategoryQuery';

@Controller('manga/genres')
export class MangaGenresController implements MangaGenresControllerInterface {
    constructor(private mangaGenresService: MangaGenresService) {}

    @Get()
    @ApiResponse({ example: mockCategoriesResponseArrayData })
    async getGenres(@Query() query: GetCategoryQuery): Promise<CategoriesResponseArrayData> {
        return await this.mangaGenresService.getGenres(query.search, query.lang);
    }
}
