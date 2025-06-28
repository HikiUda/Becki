import { PrismaClient } from '@prisma/client';

export const getEditedManga = async (prisma: PrismaClient, mangaId: number) =>
    await prisma.manga.findUnique({
        where: { id: mangaId },
        include: {
            title: true,
            description: true,
        },
    });
