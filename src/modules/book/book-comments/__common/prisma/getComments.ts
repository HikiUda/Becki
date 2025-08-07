import { Prisma, PrismaClient } from '@prisma/client';

export const getCommentsSelect = {
    id: true,
    content: true,
    userId: true,
    createdAt: true,
    parentId: true,
    isDeleted: true,
    user: { select: { id: true, name: true, avatar: true } },
} satisfies Prisma.BookCommentsSelect;

const getComments = async (prisma: PrismaClient) => {
    return await prisma.bookComments.findMany({
        select: getCommentsSelect,
    });
};

export type GetComments = Prisma.PromiseReturnType<typeof getComments>;
