import { prisma } from 'src/shared/prisma/prisma';
import { getContinueReadBooksSelectInput } from '../../__common/prisma/getContinueReadBookSelectInput';
import { ContinueReadBookQuery } from '../../__common/dto/continueReadBook.dto';

export const getContinueReadManga = async (userId: number, query: ContinueReadBookQuery) => {
    return await prisma.mangaProgressRead.findMany({
        where: { userId, show: true },
        orderBy: { updatedAt: 'desc' },
        take: query.limit,
        select: getContinueReadBooksSelectInput(query.lang),
    });
};
