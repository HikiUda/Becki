import { TransactionContextType } from 'src/common/types/prisma';
import { MutateMangaDto } from '../../dto/mutateManga.dto';
import { mutateMangaGenres } from './mutateMangaGenres';
import { mutateMangaTags } from './mutateMangaTags';

export const mutateMangaGenresAndTags = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<MutateMangaDto> => {
    const newDto = { ...dto };
    if (newDto.genres) {
        const genres = await mutateMangaGenres(newDto.genres, mangaId, tx);
        newDto.genres.set = genres;
    }
    if (newDto.tags) {
        const tags = await mutateMangaTags(newDto.tags, mangaId, tx);
        newDto.tags.set = tags;
    }
    return newDto;
};
