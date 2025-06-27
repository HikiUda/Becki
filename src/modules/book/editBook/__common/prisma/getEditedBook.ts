import { Prisma, PrismaClient } from '@prisma/client';

const getEditedBook = async (prisma: PrismaClient) =>
    await prisma.manga.findUnique({
        where: { id: 0 },
        include: {
            title: true,
            description: true,
        },
    });

export type GetEditedBookReturnType = Prisma.PromiseReturnType<typeof getEditedBook>;
