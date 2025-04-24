import { TransactionContextType } from 'src/common/types/prisma';
import { MutateMangaDto } from '../../dto/mutateManga/mutateManga.dto';
import { mutateMangaGenres } from './mutateMangaGenres';
import { mutateMangaTags } from './mutateMangaTags';

export const mutateMangaCategories = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<void> => {
    if (dto.genres) {
        await mutateMangaGenres(dto.genres, mangaId, tx);
    }

    if (dto.tags) {
        await mutateMangaTags(dto.tags, mangaId, tx);
    }
};
