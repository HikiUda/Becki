import { TransactionContextType } from 'src/shared/types/prisma';
import { MutateMangaDto } from '../../dto/mutateManga/mutateManga.dto';
import { addAuthors, clearUnbondedAuthors, deleteAuthors } from './mutateMangaAuthors';
import { addArtists, deleteArtists } from './mutateMangaArtists';
import { addPublishers, deletePublishers } from './mutateMangaPublishers';

export const mutateAllAuthorsEntities = async (
    dto: MutateMangaDto,
    mangaId: number,
    tx?: TransactionContextType,
) => {
    if (dto.authors?.add) {
        await addAuthors(dto.authors.add, mangaId, tx);
    }
    if (dto.authors?.delete) {
        await deleteAuthors(dto.authors.delete, mangaId, tx);
    }
    // mutate artitsts
    if (dto.artists?.add) {
        await addArtists(dto.artists.add, mangaId, tx);
    }
    if (dto.artists?.delete) {
        await deleteArtists(dto.artists.delete, mangaId, tx);
    }
    // mutate publishers
    if (dto.publishers?.add) {
        await addPublishers(dto.publishers.add, mangaId, tx);
    }
    if (dto.publishers?.delete) {
        await deletePublishers(dto.publishers.delete, mangaId, tx);
    }
};
