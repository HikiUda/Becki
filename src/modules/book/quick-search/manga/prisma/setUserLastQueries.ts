import { PrismaClient } from '@prisma/client';

export const setUserLastQuery = async (
    prisma: PrismaClient,
    props: { data: string[]; userId: number },
) => {
    const { data, userId } = props;

    const user = await prisma.user.update({
        where: { id: userId },
        data: { lastQuickSearch: { update: { manga: { set: data } } } },
        select: { lastQuickSearch: { select: { manga: true } } },
    });

    return user.lastQuickSearch?.manga || [];
};
