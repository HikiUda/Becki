import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectOrCreateManyToManyMangaAuthors,
    disconnectManyToManyManga,
    mutateManyToManyManga,
} from './mutateManytoManyManga';

export const addArtists = async (
    artists: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(
        connectOrCreateManyToManyMangaAuthors(artists, 'artists'),
        mangaId,
        tx,
    );
};

export type addArtistsReturnType = Prisma.PromiseReturnType<typeof addArtists>;

export const deleteArtists = async (
    artists: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateManyToManyManga(disconnectManyToManyManga(artists, 'artists'), mangaId, tx);
};

export type deleteArtistsReturnType = Prisma.PromiseReturnType<typeof deleteArtists>;

export const clearUnbondedArtists = async (artistsId: number[]) => {
    return await prisma.artists.deleteMany({
        where: { AND: [{ id: { in: artistsId } }, { mangas: { none: {} } }] },
    });
};
