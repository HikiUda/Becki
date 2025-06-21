import { Prisma } from '@prisma/client';
import { prisma } from 'src/shared/prisma/prisma';

export const dontShowContinueReadManga = async (userId: number, mangaId: number) => {
    return await prisma.progressReadManga.updateMany({
        where: { AND: [{ userId }, { mangaId: mangaId === 0 ? undefined : mangaId }] },
        data: { show: false },
    });
};
export type DontShowContinueReadMangaReturnType = Prisma.PromiseReturnType<
    typeof dontShowContinueReadManga
>;
