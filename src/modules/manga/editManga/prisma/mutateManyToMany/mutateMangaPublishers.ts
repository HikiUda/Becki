import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectOrCreateManyToManyMangaAuthors,
    disconnectManyToManyManga,
    mutateManyToManyManga,
} from './mutateManytoManyManga';

export const addPublishers = async (
    publishers: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(
        connectOrCreateManyToManyMangaAuthors(publishers, 'publishers'),
        mangaId,
        tx,
    );
};

export type addPublishersReturnType = Prisma.PromiseReturnType<typeof addPublishers>;

export const deletePublishers = async (
    publishers: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(
        disconnectManyToManyManga(publishers, 'publishers'),
        mangaId,
        tx,
    );
};

export type deletePublishersReturnType = Prisma.PromiseReturnType<typeof deletePublishers>;

export const clearUnbondedPublishers = async (publishersId: number[]) => {
    return await prisma.publishers.deleteMany({
        where: { AND: [{ id: { in: publishersId } }, { mangas: { none: {} } }] },
    });
};
