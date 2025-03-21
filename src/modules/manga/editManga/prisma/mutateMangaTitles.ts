import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { CreateMangaTitleType, UpdateMangaTitleType } from '../dto/mutateManga.dto';
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

const updateMangaTitleInput = (title: UpdateMangaTitleType): Prisma.MangaTitlesUpdateInput => {
    const data: Prisma.MangaTitlesUpdateInput = {};
    if (title.ru) data.ru = title.ru;
    if (title.en) data.en = title.en;
    if (title.main) data.main = title.main;
    return data;
};
export const updateMangaTitles = async (
    titles: UpdateMangaTitleType[],
    tx?: TransactionContextType,
) => {
    if (tx) {
        return await prisma.$transaction(
            titles.map((title) =>
                tx.mangaTitles.update({
                    where: { id: title.id },
                    data: updateMangaTitleInput(title),
                }),
            ),
        );
    }
    return await prisma.$transaction(
        titles.map((title) =>
            prisma.mangaTitles.update({
                where: { id: title.id },
                data: updateMangaTitleInput(title),
            }),
        ),
    );
};
export type updateMangaTitlesReturnType = Prisma.PromiseReturnType<typeof updateMangaTitles>;

export const deleteMangaTitles = async (titles: number[], tx?: TransactionContextType) => {
    if (tx) {
        return await tx.mangaTitles.deleteMany({
            where: { id: { in: titles } },
        });
    }
    return await prisma.mangaTitles.deleteMany({
        where: { id: { in: titles } },
    });
};
export type deleteMangaTitlesReturnType = Prisma.PromiseReturnType<typeof deleteMangaTitles>;
