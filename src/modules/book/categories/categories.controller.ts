import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CategoriesControllerInterface } from './interfaces/categoriesController';
import { CategoriesService } from './categories.service';
import { CategoryDtoList } from './dto/category.dto';
import { GetCategoriesQuery } from './dto/getCategoriesQuery';

@Controller('book')
export class CategoriesController implements CategoriesControllerInterface {
    constructor(private service: CategoriesService) {}

    @Get('genres')
    @ApiOkResponse({ type: CategoryDtoList })
    async getGenres(@Query() query: GetCategoriesQuery): Promise<CategoryDtoList> {
        return await this.service.getGenres(query);
    }

    @Get('tags')
    @ApiOkResponse({ type: CategoryDtoList })
    async getTags(@Query() query: GetCategoriesQuery): Promise<CategoryDtoList> {
        return await this.service.getTags(query);
    }
}
