import { Injectable } from '@nestjs/common';
import { QuickSearchRepositoryInterface } from '../__common/interfaces/quickSearchRepository';
import { QuickSearchManga } from './dto/quickSearchManga.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
    getQuickSearchBooksSelectInput,
    getQuickSearchBooksWhereInput,
    toQuickSearchBooks,
} from '../__common/prisma/getQuickSearchBooks';
import { UserId } from 'src/modules/authorization';

@Injectable()
export class QuickSearchMangaRepository implements QuickSearchRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBooks(query: QuickSearchQuery): Promise<QuickSearchManga[]> {
        const manga = await this.prisma.manga.findMany({
            take: query.limit,
            where: getQuickSearchBooksWhereInput(query.search, query.bookLang),
            orderBy: { statistic: { rate: 'desc' } },
            select: getQuickSearchBooksSelectInput(),
        });
        return toQuickSearchBooks(manga);
    }

    async getUserLastQueries(userId: UserId): Promise<string[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { lastQuickSearch: { select: { manga: true } } },
        });
        return user?.lastQuickSearch?.manga || [];
    }

    async setUserLastQueries(data: string[], userId: UserId): Promise<string[]> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { lastQuickSearch: { update: { manga: { set: data } } } },
            select: { lastQuickSearch: { select: { manga: true } } },
        });
        return user.lastQuickSearch?.manga || [];
    }
}
