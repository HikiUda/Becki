import { Manga, Prisma } from '@prisma/client';

export interface MutateMangaRepositoryInterface {
    // TODO replace any
    createManga: (dto: Prisma.MangaCreateInput) => Promise<Manga>;
}
