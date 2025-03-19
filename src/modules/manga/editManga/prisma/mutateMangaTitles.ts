import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { CreateMangaTitleType } from '../dto/mutateManga.dto';
import { TransactionContextType } from 'src/common/types/prisma';

const createMangaTitleInput = (
    title: CreateMangaTitleType,
    mangaId: number,
): Prisma.MangaTitlesCreateManyInput => {
    return {
        ru: title.ru,
        en: title.en || null,
        main: !!title.main,
        mangaId,
    };
};

export const createMangaTitles = async (
    titles: CreateMangaTitleType[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    if (tx) {
        return await tx.mangaTitles.createMany({
            data: titles.map((title) => createMangaTitleInput(title, mangaId)),
        });
    }
    return await prisma.mangaTitles.createMany({
        data: titles.map((title) => createMangaTitleInput(title, mangaId)),
    });
};

export type createMangaTitlesReturnType = Prisma.PromiseReturnType<typeof createMangaTitles>;
