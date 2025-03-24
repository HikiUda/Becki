import { TransactionContextType } from 'src/common/types/prisma';
import { MutateMangaDto } from '../../dto/mutateManga.dto';
import { mutateMangaJanres } from './mutateMangaJanres';
import { mutateMangaTags } from './mutateMangaTags';

export const mutateMangaJanresAndTags = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<MutateMangaDto> => {
    const newDto = { ...dto };
    if (newDto.janres) {
        const janres = await mutateMangaJanres(newDto.janres, mangaId, tx);
        newDto.janres.set = janres;
    }
    if (newDto.tags) {
        const tags = await mutateMangaTags(newDto.tags, mangaId, tx);
        newDto.tags.set = tags;
    }
    return newDto;
};
