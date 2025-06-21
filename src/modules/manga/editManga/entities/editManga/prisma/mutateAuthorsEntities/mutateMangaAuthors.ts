import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';
import {
    connectOrCreateAuthorsEntities,
    disconnectAuthorsEntities,
    mutateAuthorsEntities,
} from './mutateAuthorsEntities';

export const addAuthors = async (
    authors: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateAuthorsEntities(
        connectOrCreateAuthorsEntities(authors, 'authors'),
        mangaId,
        tx,
    );
};

export type AddAuthorsReturnType = Prisma.PromiseReturnType<typeof addAuthors>;

export const clearUnbondedAuthors = async (authorsId: number[]) => {
    return await prisma.authors.deleteMany({
        where: { AND: [{ id: { in: authorsId } }, { mangas: { none: {} } }] },
    });
};

export const deleteAuthors = async (
    authors: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const data = await mutateAuthorsEntities(
        disconnectAuthorsEntities(authors, 'authors'),
        mangaId,
        tx,
    );
    clearUnbondedAuthors(authors);
    return data;
};

export type DeleteAuthorsReturnType = Prisma.PromiseReturnType<typeof deleteAuthors>;
