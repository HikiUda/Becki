import { prisma } from 'src/shared/prisma/prisma';

export const dontShowContinueReadManga = async (userId: number, bookId: number) => {
    return await prisma.mangaProgressRead.updateMany({
        where: { AND: [{ userId }, { bookId: bookId === 0 ? undefined : bookId }] },
        data: { show: false },
    });
};
