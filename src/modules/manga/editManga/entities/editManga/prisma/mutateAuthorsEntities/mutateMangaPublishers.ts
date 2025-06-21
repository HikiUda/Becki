import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';
import { TransactionContextType } from 'src/shared/types/prisma';
import {
    connectOrCreateAuthorsEntities,
    disconnectAuthorsEntities,
    mutateAuthorsEntities,
} from './mutateAuthorsEntities';

export const addPublishers = async (
    publishers: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateAuthorsEntities(
        connectOrCreateAuthorsEntities(publishers, 'publishers'),
        mangaId,
        tx,
    );
};

export type AddPublishersReturnType = Prisma.PromiseReturnType<typeof addPublishers>;

export const clearUnbondedPublishers = async (publishersId: number[]) => {
    return await prisma.publishers.deleteMany({
        where: { AND: [{ id: { in: publishersId } }, { mangas: { none: {} } }] },
    });
};

export const deletePublishers = async (
    publishers: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const data = await mutateAuthorsEntities(
        disconnectAuthorsEntities(publishers, 'publishers'),
        mangaId,
        tx,
    );
    clearUnbondedPublishers(publishers);
    return data;
};

export type DeletePublishersReturnType = Prisma.PromiseReturnType<typeof deletePublishers>;
