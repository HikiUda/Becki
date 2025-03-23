import { MangaStatus, MangaType } from '@prisma/client';

export interface UpdateMangaOtherTitleType {
    id: number;
    title: string;
}

export interface MutateMangaOtherTitlesType {
    createTitles?: string[];
    updateTitles?: UpdateMangaOtherTitleType[];
    deleteTitles?: number[];
}

export interface MutateMangaTitle {
    ru?: string;
    en?: string;
    origin?: string;
}

export interface MutateMangaDescriptionType {
    ru?: string;
    en?: string;
}

export interface MutateManyToManyInMangaType {
    add?: number[];
    delete?: number[];
}

export interface MutateAuthorsInMangaType {
    add?: string[];
    delete?: number[];
}

export interface MutateMangaDto {
    urlId?: string;
    title?: MutateMangaTitle;
    otherTitles?: MutateMangaOtherTitlesType;
    description?: MutateMangaDescriptionType;
    status?: MangaStatus;
    type?: MangaType;
    releaseDate?: Date;
    janres?: MutateManyToManyInMangaType;
    tags?: MutateManyToManyInMangaType;
    coversId?: number;
    banner?: string;
    authors?: MutateAuthorsInMangaType;
    artists?: MutateAuthorsInMangaType;
    publishers?: MutateAuthorsInMangaType;
}
