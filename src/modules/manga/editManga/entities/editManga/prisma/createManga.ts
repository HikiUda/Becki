import { MangaStatus, MangaType, Prisma } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';

function createMangaInput(dto: MutateMangaDto): Prisma.MangaCreateInput {
    const data: Prisma.MangaCreateInput = {
        title: {
            create: {
                ru: dto.title?.ru || 'Название на русском обязательно',
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
        mangaStatistic: {
            create: {},
        },
        releaseDate: dto.releaseDate || null,
        ageRate: dto.ageRate || 0,
        status: dto.status || MangaStatus.Ongoing,
        type: dto.type || MangaType.Manga,
        // TODO add owner from auth
        owner: {
            connect: { id: 2 },
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
