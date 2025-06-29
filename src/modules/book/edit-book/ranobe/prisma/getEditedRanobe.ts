import { PrismaClient } from '@prisma/client';

export const getEditedRanobe = async (prisma: PrismaClient, id: number) =>
    await prisma.ranobe.findUnique({
        where: { id },
        include: {
            title: true,
            description: true,
        },
    });
