import { PrismaClient } from '@prisma/client';
import { getOrderInput } from './book/getOrderInput';
import { getSelectInput } from './book/getSelectInput';
import { CatalogRanobeQuery } from '../dto/catalogRanobeQuery.dto';
import { getCatalogRanobeWhereInput } from './getCatalogRanobeWhereInput';
import { UserId } from 'src/modules/user/auth';

export const getCatalogRanobe = async (
    prisma: PrismaClient,
    query: CatalogRanobeQuery,
    userId?: UserId,
) => {
    const { limit, page } = query;
    const skip = limit * (page - 1);

    const manga = await prisma.ranobe.findMany({
        take: limit,
        skip,
        orderBy: getOrderInput(query),
        where: getCatalogRanobeWhereInput(query, userId),
        select: getSelectInput(userId),
    });
    const count = await prisma.ranobe.count({
        where: getCatalogRanobeWhereInput(query),
    });
    return [manga, count] as const;
};
