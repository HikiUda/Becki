import { Prisma } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga.dto';
import { TransactionContextType } from 'src/common/types/prisma';
import { prisma } from 'src/common/helpers/prisma';

function updateMangaInput(dto: MutateMangaDto): Prisma.MangaUpdateInput {
    const data: Prisma.MangaUpdateInput = {};
    if (dto.title?.ru || dto.title?.en || dto.title?.origin) {
        const { ru, en, origin } = dto.title;
        data.title = {};
        data.title.update = {};
        if (ru) data.title.update.ru = ru;
        if (en) data.title.update.en = en;
        if (origin) data.title.update.origin = origin;
    }
    if (dto.urlId) {
        data.urlId = dto.urlId;
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
    if (dto.banner) data.banner = dto.banner;
    if (dto.coversId) {
        data.mangaCovers = {
            updateMany: {
                where: { main: true },
                data: { main: false },
            },
            update: {
                where: { id: dto.coversId },
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
    if (tx) {
        return await tx.manga.update({ where: { id: mangaId }, data: updateMangaInput(dto) });
    }
    return await prisma.manga.update({ where: { id: mangaId }, data: updateMangaInput(dto) });
};

export type updateMangaReturnType = Prisma.PromiseReturnType<typeof updateManga>;
