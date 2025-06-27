import { Injectable } from '@nestjs/common';
import { LastUpdatedRepositoryInterface } from './interfaces/publicMangaRepository';
import { LastUpdatedQueryDto } from './dto/lastUpdatedQuery.dto';
import { getPagination } from 'src/shared/helpers/pagination/getPagination';
import { LastUpdatedMangaListDto } from './dto/lastUpdatedManga.dto';
import { getLastUpdatedManga } from './prisma/getLastUpdatedManga';
import { toLastUpdatedBookDto } from './prisma/toLastUpdatedBookDto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class LastUpdatedRepository implements LastUpdatedRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getLastUpdatedManga(
        query: LastUpdatedQueryDto,
        userId?: number,
    ): Promise<LastUpdatedMangaListDto> {
        const [manga, count] = await getLastUpdatedManga(this.prisma, query, userId);
        return {
            data: toLastUpdatedBookDto(manga, query.lang),
            ...getPagination(count, query.page, query.limit),
        };
    }
}
