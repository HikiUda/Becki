import { Prisma } from '@prisma/client';
import { prisma } from 'src/common/helpers/prisma';
import { TransactionContextType } from 'src/common/types/prisma';
import {
    connectOrCreateAuthorsEntities,
    disconnectAuthorsEntities,
    mutateAuthorsEntities,
} from './mutateAuthorsEntities';

export const addArtists = async (
    artists: string[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    return await mutateAuthorsEntities(
        connectOrCreateAuthorsEntities(artists, 'artists'),
        mangaId,
        tx,
    );
};

export type AddArtistsReturnType = Prisma.PromiseReturnType<typeof addArtists>;

export const clearUnbondedArtists = async (artistsId: number[]) => {
    return await prisma.artists.deleteMany({
        where: { AND: [{ id: { in: artistsId } }, { mangas: { none: {} } }] },
    });
};

export const deleteArtists = async (
    artists: number[],
    mangaId: number,
    tx?: TransactionContextType,
) => {
    const data = await mutateAuthorsEntities(
        disconnectAuthorsEntities(artists, 'artists'),
        mangaId,
        tx,
    );
    clearUnbondedArtists(artists);
    return data;
};

export type DeleteArtistsReturnType = Prisma.PromiseReturnType<typeof deleteArtists>;
