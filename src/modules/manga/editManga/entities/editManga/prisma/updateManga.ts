import { Prisma } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga/mutateManga.dto';
import { TransactionContextType } from 'src/common/types/prisma';
import { prisma } from 'src/common/helpers/prisma';

function updateMangaInput(dto: MutateMangaDto): Prisma.MangaUpdateInput {
    const data: Prisma.MangaUpdateInput = {};
    if (dto.urlId) {
        data.urlId = dto.urlId;
    }
    if (dto.title?.ru || dto.title?.en || dto.title?.origin) {
        const { ru, en, origin } = dto.title;
        data.title = {};
        data.title.update = {};
        if (ru) data.title.update.ru = ru;
        if (en) data.title.update.en = en;
        if (origin) data.title.update.origin = origin;
    }
    if (dto.description?.ru || dto.description?.en) {
        const { ru, en } = dto.description;
        data.description = {};
        data.description.update = {};
        if (ru) data.description.update.ru = ru;
        if (en) data.description.update.en = en;
    }

    if (dto.releaseDate) data.releaseDate = dto.releaseDate;
    if (dto.status) data.status = dto.status;
    if (dto.type) data.type = dto.type;
    if (dto.ageRate) data.ageRate = dto.ageRate;
    if (dto.banner) data.banner = dto.banner;
    if (dto.coverId) {
        data.mangaCovers = {
            updateMany: {
                where: { main: true },
                data: { main: false },
            },
            update: {
                where: { id: dto.coverId },
                data: { main: true },
            },
        };
    }

    return data;
}

export const updateManga = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const context = tx || prisma;

    return await context.manga.update({
        where: { id: mangaId },
        data: updateMangaInput(dto),
    });
};

export type UpdateMangaReturnType = Prisma.PromiseReturnType<typeof updateManga>;
