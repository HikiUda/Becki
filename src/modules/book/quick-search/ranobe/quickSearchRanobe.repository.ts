import { Injectable } from '@nestjs/common';
import { QuickSearchRepositoryInterface } from '../__common/interfaces/quickSearchRepository';
import { QuickSearchRanobe } from './dto/quickSearchRanobe.dto';
import { QuickSearchQuery } from '../__common/dto/quickSearchQuery.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import {
    getQuickSearchBooksSelectInput,
    getQuickSearchBooksWhereInput,
    toQuickSearchBooks,
} from '../__common/prisma/getQuickSearchBooks';
import { UserId } from 'src/modules/user/auth';

@Injectable()
export class QuickSearchRanobeRepository implements QuickSearchRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async getBooks(query: QuickSearchQuery): Promise<QuickSearchRanobe[]> {
        const ranobe = await this.prisma.ranobe.findMany({
            take: query.limit,
            where: getQuickSearchBooksWhereInput(query.search),
            orderBy: { statistic: { rate: 'desc' } },
            select: getQuickSearchBooksSelectInput(),
        });
        return toQuickSearchBooks(ranobe, query.lang);
    }

    async getUserLastQueries(userId: UserId): Promise<string[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { lastQuickSearch: { select: { ranobe: true } } },
        });
        return user?.lastQuickSearch?.ranobe || [];
    }

    async setUserLastQueries(data: string[], userId: UserId): Promise<string[]> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { lastQuickSearch: { update: { ranobe: { set: data } } } },
            select: { lastQuickSearch: { select: { ranobe: true } } },
        });
        return user.lastQuickSearch?.ranobe || [];
    }
}
