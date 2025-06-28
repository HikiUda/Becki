import { PrismaClient } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { getUpdateBookInput } from '../../__common/prisma/getUpdateBookInput';

export const updateManga = async (prisma: PrismaClient, dto: MutateMangaDto, mangaId: number) => {
    const manga = await prisma.manga.update({
        where: { id: mangaId },
        data: getUpdateBookInput(dto),
    });
    return manga.id;
};
