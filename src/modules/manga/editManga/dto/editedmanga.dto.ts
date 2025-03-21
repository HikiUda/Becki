import { MangaStatus, MangaType } from '@prisma/client';

export interface EditedMangaTitle {
    id: number;
    ru: string;
    en: string | null;
    main: boolean;
}

export interface EditedMangaDescription {
    ru: string;
    en: string | null;
}

export interface EditedMangaJanresAndTags {
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
    titles: EditedMangaTitle[];
    description: EditedMangaDescription;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    janres: EditedMangaJanresAndTags[];
    tags: EditedMangaJanresAndTags[];
    covers: EditedMangaCovers[];
    banner: string | null;
    authors: EditedMangaAuthors[];
    artists: EditedMangaAuthors[];
    publishers: EditedMangaAuthors[];
}
