import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

type AuthorsEntities = 'authors' | 'artists' | 'publishers';

export const disconnectAuthorsEntities = (
    ids: number[],
    entity: AuthorsEntities,
): Prisma.MangaUpdateInput => {
    const data: Prisma.MangaUpdateInput = {};
    data[entity] = {};
    data[entity].disconnect = ids.map((id) => ({ id }));
    return data;
};

export const connectOrCreateAuthorsEntities = (
    names: string[],
    entity: AuthorsEntities,
): Prisma.MangaUpdateInput => {
    const data: Prisma.MangaUpdateInput = {};
    data[entity] = {};
    data[entity].connectOrCreate = names.map((name) => ({ where: { name }, create: { name } }));
    return data;
};

export const mutateAuthorsEntities = async (
    input: Prisma.MangaUpdateInput,
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const context = tx || prisma;
    return await context.manga.update({ where: { id: mangaId }, data: input });
};
