import { TransactionContextType } from 'src/shared/types/prisma';
import { MutateMangaDto } from '../../dto/mutateManga/mutateManga.dto';
import { createMangaOtherTitles } from './createOtherTitles';
import { updateMangaOtherTitles } from './updateOtherTitles';
import { deleteMangaOtherTitles } from './deleteOtherTitles';

export const mutateOtherTitles = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
): Promise<void> => {
    if (dto.otherTitles?.createTitles) {
        await createMangaOtherTitles(dto.otherTitles.createTitles, mangaId, tx);
    }
    if (dto.otherTitles?.updateTitles) {
        await updateMangaOtherTitles(dto.otherTitles.updateTitles, tx);
    }
    if (dto.otherTitles?.deleteTitles) {
        await deleteMangaOtherTitles(dto.otherTitles.deleteTitles, tx);
    }
};
