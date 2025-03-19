import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectOrCreateManyToManyMangaAuthors,
    disconnectManyToManyManga,
    mutateManyToManyManga,
} from './mutateManytoManyManga';

export const addAuthors = async (
    authors: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(
        connectOrCreateManyToManyMangaAuthors(authors, 'authors'),
        mangaId,
        tx,
    );
};

export type addAuthorsReturnType = Prisma.PromiseReturnType<typeof addAuthors>;

export const deleteAuthors = async (
    authors: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(disconnectManyToManyManga(authors, 'authors'), mangaId, tx);
};

export type deleteAuthorsReturnType = Prisma.PromiseReturnType<typeof deleteAuthors>;

export const clearUnbondedAuthors = async (authorsId: number[]) => {
    return await prisma.authors.deleteMany({
        where: { AND: [{ id: { in: authorsId } }, { mangas: { none: {} } }] },
    });
};
