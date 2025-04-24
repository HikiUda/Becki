import { Controller, Get, Query } from '@nestjs/common';
import { MangaGenresControllerInterface } from './interfaces/mangaGenresController';
import { MangaGenresService } from './mangaGenres.service';
import { CategoryDto } from '../../dto/category.dto';
import { mockCategories } from '../../mock/mockCategories';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoryQuery } from '../../dto/getCategoryQuery';

@Controller('manga/genres')
export class MangaGenresController implements MangaGenresControllerInterface {
    constructor(private mangaGenresService: MangaGenresService) {}

    @Get()
    @ApiResponse({ example: mockCategories })
    async getGenres(@Query() query: GetCategoryQuery): Promise<CategoryDto[]> {
        return await this.mangaGenresService.getGenres(query.search, query.lang);
    }
}
