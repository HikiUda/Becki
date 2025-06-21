import { prisma } from 'src/shared/prisma/prisma';
import { MangaListQueryDto } from '../../dto/getMangaListQuery';
import { getMangaListWhereInput } from './getMangaListWhereInput';

export const getMangaListCount = async (query: MangaListQueryDto) => {
    return await prisma.manga.count({
        where: getMangaListWhereInput(query),
    });
};
