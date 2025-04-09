import { MangaStatus, MangaType } from '@prisma/client';

export interface EditedMangaTitle {
    ru: string;
    en: string | null;
    origin: string | null;
}
export interface EditedMangaOtherTitles {
    id: number;
    title: string;
}

export interface EditedMangaDescription {
    ru: string;
    en: string | null;
}

export interface EditedMangaGenresAndTags {
    id: number;
    title: string;
}
export interface EditedMangaAuthors {
    id: number;
    name: string;
}

export interface EditedMangaCovers {
    id: number;
    cover: string;
}

export interface EditedMangaDto {
    id: number;
    urlId: string;
    title: EditedMangaTitle;
    otherTitles: EditedMangaOtherTitles[];
    description: EditedMangaDescription;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    genres: EditedMangaGenresAndTags[];
    tags: EditedMangaGenresAndTags[];
    covers: EditedMangaCovers[];
    banner: string | null;
    authors: EditedMangaAuthors[];
    artists: EditedMangaAuthors[];
    publishers: EditedMangaAuthors[];
}
