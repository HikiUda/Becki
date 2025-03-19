import { Prisma } from '@prisma/client';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectManyToManyManga,
    disconnectManyToManyManga,
    mutateManyToManyManga,
} from './mutateManytoManyManga';

export const addJanres = async (janres: number[], mangaId: number, tx?: TransactionContextType) => {
    return await mutateManyToManyManga(connectManyToManyManga(janres, 'janres'), mangaId, tx);
};

export type addJanresReturnType = Prisma.PromiseReturnType<typeof addJanres>;

export const deleteJanres = async (
    janres: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(disconnectManyToManyManga(janres, 'janres'), mangaId, tx);
};

export type deleteJanresReturnType = Prisma.PromiseReturnType<typeof deleteJanres>;
