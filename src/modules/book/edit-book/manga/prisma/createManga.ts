import { PrismaClient } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { createBookInput } from '../../__common/prisma/getCreateBookInput';

export const createManga = async (prisma: PrismaClient, dto: MutateMangaDto) => {
    const manga = await prisma.manga.create({ data: createBookInput(dto) });
    return manga.id;
};
