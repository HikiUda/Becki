import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { UpdateMangaOtherTitleType } from '../dto/mutateManga.dto';
import { TransactionContextType } from 'src/common/types/prisma';

const createMangaOtherTitleInput = (
    title: string,
    mangaId: number,
): Prisma.MangaOtherTitlesCreateManyInput => {
    return {
        title,
        mangaId,
    };
};

export const createMangaOtherTitles = async (
    titles: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    if (tx) {
        return await tx.mangaOtherTitles.createMany({
            data: titles.map((title) => createMangaOtherTitleInput(title, mangaId)),
        });
    }
    return await prisma.mangaOtherTitles.createMany({
        data: titles.map((title) => createMangaOtherTitleInput(title, mangaId)),
    });
};

export type createMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof createMangaOtherTitles
>;

const updateMangaOtherTitleInput = (
    title: UpdateMangaOtherTitleType,
): Prisma.MangaOtherTitlesUpdateInput => {
    const data: Prisma.MangaOtherTitlesUpdateInput = {};
    if (title.title) data.title = title.title;
    return data;
};
export const updateMangaOtherTitles = async (
    titles: UpdateMangaOtherTitleType[],
    tx?: TransactionContextType,
) => {
    if (tx) {
        return await prisma.$transaction(
            titles.map((title) =>
                tx.mangaOtherTitles.update({
                    where: { id: title.id },
                    data: updateMangaOtherTitleInput(title),
                }),
            ),
        );
    }
    return await prisma.$transaction(
        titles.map((title) =>
            prisma.mangaOtherTitles.update({
                where: { id: title.id },
                data: updateMangaOtherTitleInput(title),
            }),
        ),
    );
};
export type updateMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof updateMangaOtherTitles
>;

export const deleteMangaOtherTitles = async (titles: number[], tx?: TransactionContextType) => {
    if (tx) {
        return await tx.mangaOtherTitles.deleteMany({
            where: { id: { in: titles } },
        });
    }
    return await prisma.mangaOtherTitles.deleteMany({
        where: { id: { in: titles } },
    });
};
export type deleteMangaOtherTitlesReturnType = Prisma.PromiseReturnType<
    typeof deleteMangaOtherTitles
>;
