import { PrismaClient } from '@prisma/client';

export const getEditedManga = async (prisma: PrismaClient, id: number) =>
    await prisma.manga.findUnique({
        where: { id },
        include: {
            title: true,
            description: true,
        },
    });
