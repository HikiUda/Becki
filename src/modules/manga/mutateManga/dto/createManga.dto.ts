import { MangaStatus, MangaType, Prisma } from '@prisma/client';
import { MutateMangaDto } from './mutateManga.dto';

export function toMangaCreateInput(dto: MutateMangaDto): Prisma.MangaCreateInput {
    // TODO add owner from auth
    // TODO add banner
    const data: Prisma.MangaCreateInput = {
        description: {
            create: {
                ru: dto.description?.ru || '',
                en: dto.description?.en || '',
            },
        },
        releaseDate: dto.releaseDate || null,
        status: dto.status || MangaStatus.Ongoing,
        type: dto.type || MangaType.Manga,

        owner: {
            connect: { id: 1 },
        },
    };

    return data;
}
