import { Prisma } from '@prisma/client';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectManyToManyManga,
    disconnectManyToManyManga,
    mutateManyToManyManga,
} from './mutateManytoManyManga';

export const addTags = async (tags: number[], mangaId: number, tx?: TransactionContextType) => {
    return await mutateManyToManyManga(connectManyToManyManga(tags, 'tags'), mangaId, tx);
};

export type addTagsReturnType = Prisma.PromiseReturnType<typeof addTags>;

export const deleteTags = async (tags: number[], mangaId: number, tx?: TransactionContextType) => {
    return await mutateManyToManyManga(disconnectManyToManyManga(tags, 'tags'), mangaId, tx);
};

export type deleteTagsReturnType = Prisma.PromiseReturnType<typeof deleteTags>;
