import { Prisma } from '@prisma/client';
import { MutateMangaDto } from '../dto/mutateManga.dto';

export function toMangaUpdateInput(dto: MutateMangaDto): Prisma.MangaUpdateInput {
    // TODO add banner
    const data: Prisma.MangaUpdateInput = {};
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

    return data;
}
