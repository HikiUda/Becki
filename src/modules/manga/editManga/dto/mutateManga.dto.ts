import { MangaStatus, MangaType } from '@prisma/client';

export interface CreateMangaTitleType {
    ru: string;
    en?: string;
    main?: boolean;
}
export interface UpdateMangaTitleType {
    id: number;
    ru?: string;
    en?: string;
    main?: boolean;
}

export interface MutateMangaTitlesType {
    createTitles?: CreateMangaTitleType[];
    updateTitles?: UpdateMangaTitleType[];
    deleteTitles?: number[];
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
    titles?: MutateMangaTitlesType;
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
