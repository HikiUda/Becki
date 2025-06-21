import { Injectable } from '@nestjs/common';
import { QuickSearchRepositoryInterface } from '../__common/interfaces/quickSearchRepository';
import { QuickSearchMangaDto } from './dto/quickSearchManga';
import { QuickSearchQueryDto } from '../__common/dto/quickSearchQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { getQuickSearchManga, toQuickSearchMangaDto } from './prisma/getQuickSearchManga';
import { setUserLastQuery } from './prisma/setUserLastQueries';
import { getUserLastQueries } from './prisma/getUserLastQueries';

@Injectable()
export class QuickSearchMangaRepository
    implements QuickSearchRepositoryInterface<QuickSearchMangaDto[]>
{
    constructor(private prisma: PrismaService) {}

    async getBooks(query: QuickSearchQueryDto): Promise<QuickSearchMangaDto[]> {
        const manga = await getQuickSearchManga(this.prisma, query);
        return toQuickSearchMangaDto(manga, query.lang);
    }
    async getUserLastQueries(userId: number): Promise<string[]> {
        return await getUserLastQueries(this.prisma, userId);
    }
    async setUserLastQueries(data: string[], userId: number): Promise<string[]> {
        return await setUserLastQuery(this.prisma, { data, userId });
    }
}
