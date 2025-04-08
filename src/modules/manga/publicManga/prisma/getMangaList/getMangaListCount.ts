import { prisma } from 'src/common/helpers/prisma';
import { MangaListQueryDto } from '../../dto/publicManga/getMangaListQuery';
import { getMangaListWhereInput } from './getMangaListWhereInput';

export const getMangaListCount = async (query: MangaListQueryDto) => {
    return await prisma.manga.count({
        where: getMangaListWhereInput(query),
    });
};
