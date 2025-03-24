import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

type ManyToManyMangaEntityType = 'authors' | 'artists' | 'publishers';

export const disconnectManyToManyManga = (
    ids: number[],
    entity: ManyToManyMangaEntityType,
): Prisma.MangaUpdateInput => {
    const data: Prisma.MangaUpdateInput = {};
    data[entity] = {};
    data[entity].disconnect = ids.map((id) => ({ id }));
    return data;
};
export const connectManyToManyManga = (
    ids: number[],
    entity: ManyToManyMangaEntityType,
): Prisma.MangaUpdateInput => {
    const data: Prisma.MangaUpdateInput = {};
    data[entity] = {};
    data[entity].connect = ids.map((id) => ({ id }));
    return data;
};
export const connectOrCreateManyToManyMangaAuthors = (
    names: string[],
    entity: Exclude<ManyToManyMangaEntityType, 'janres' | 'tags'>,
): Prisma.MangaUpdateInput => {
    const data: Prisma.MangaUpdateInput = {};
    data[entity] = {};
    data[entity].connectOrCreate = names.map((name) => ({ where: { name }, create: { name } }));
    return data;
};

export const mutateManyToManyManga = async (
    input: Prisma.MangaUpdateInput,
    mangaId: number,
    tx?: TransactionContextType,
) => {
    if (tx) {
        return await tx.manga.update({ where: { id: mangaId }, data: input });
    }
    return await prisma.manga.update({ where: { id: mangaId }, data: input });
};
