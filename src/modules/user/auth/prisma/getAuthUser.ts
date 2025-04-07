import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const getAuthUser = async (login: string) => {
    return await prisma.user.findUnique({
        where: { login },
        select: { id: true, name: true, login: true, password: true },
    });
};
export type GetMangaReturnType = Prisma.PromiseReturnType<typeof getAuthUser>;
