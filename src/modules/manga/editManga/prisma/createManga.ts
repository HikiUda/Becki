import { MangaStatus, MangaType, Prisma } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

function createMangaInput(dto: MutateMangaDto): Prisma.MangaCreateInput {
    const data: Prisma.MangaCreateInput = {
        urlId: dto.urlId,
        title: {
            create: {
                ru: dto.title?.ru || '',
                en: dto.title?.en || null,
                origin: dto.title?.origin || null,
            },
        },
        description: {
            create: {
                ru: dto.description?.ru || '',
                en: dto.description?.en || null,
            },
        },
        releaseDate: dto.releaseDate || null,
        status: dto.status || MangaStatus.Ongoing,
        type: dto.type || MangaType.Manga,
        // TODO add owner from auth
        owner: {
            connect: { id: 1 },
        },
    };

    return data;
}

export const createManga = async (dto: MutateMangaDto, tx?: TransactionContextType) => {
    if (tx) {
        return await tx.manga.create({ data: createMangaInput(dto) });
    }
    return await prisma.manga.create({ data: createMangaInput(dto) });
};

export type createMangaReturnType = Prisma.PromiseReturnType<typeof createManga>;
