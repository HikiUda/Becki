import { Injectable } from '@nestjs/common';
import { LastUpdatedRepositoryInterface } from './interfaces/publicMangaRepository';
import { LastUpdatedQuery } from './dto/lastUpdatedQuery.dto';
import { getPagination } from 'src/shared/dto/pagination.dto';
import { LastUpdatedMangaList } from './dto/lastUpdatedManga.dto';
import { getLastUpdatedManga } from './prisma/getLastUpdatedManga';
import { toLastUpdatedBook } from './prisma/toLastUpdatedBook';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { LastUpdatedRanobeList } from './dto/lastUpdatedRanobe.dto';
import { getLastUpdatedRanobe } from './prisma/getLastUpdatedRanobe';
import { UserId } from 'src/modules/user/auth';

@Injectable()
export class LastUpdatedRepository implements LastUpdatedRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getLastUpdatedManga(
        query: LastUpdatedQuery,
        userId?: UserId,
    ): Promise<LastUpdatedMangaList> {
        const [manga, count] = await getLastUpdatedManga(this.prisma, query, userId);
        return {
            data: toLastUpdatedBook(manga),
            ...getPagination(count, query.page, query.limit),
        };
    }

    async getLastUpdatedRanobe(
        query: LastUpdatedQuery,
        userId?: UserId,
    ): Promise<LastUpdatedRanobeList> {
        const [ranboe, count] = await getLastUpdatedRanobe(this.prisma, query, userId);
        return {
            data: toLastUpdatedBook(ranboe),
            ...getPagination(count, query.page, query.limit),
        };
    }
}
