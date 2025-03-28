import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';

export const getUserData = async (id: number) => {
    return await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, avatar: true, jsonSettings: true },
    });
};

export type getUserDataReturnType = Prisma.PromiseReturnType<typeof getUserData>;
