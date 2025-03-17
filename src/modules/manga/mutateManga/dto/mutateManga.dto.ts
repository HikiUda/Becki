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

export interface MutateJanresInMangaType {
    addJanres?: number[];
    deleteJanres?: number[];
}
export interface MutateTagsInMangaType {
    addJanres?: number[];
    deleteJanres?: number[];
}

export interface MutateMangaDto {
    titles?: MutateMangaTitlesType;
    description?: MutateMangaDescriptionType;
    status?: MangaStatus;
    type?: MangaType;
    releaseDate?: Date;
    janres?: MutateJanresInMangaType;
    tags?: MutateTagsInMangaType;
    //cover?: string;
    //banner?: string;
    //authors?: string[];
    //artists?: string[];
    //publishers?: string[];
}
export interface MutatedMangaDto {
    id: number;
    title: string;
    description: string;
    rate: number;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    janres: string[];
    tags: string[];
    cover: string | null;
    banner: string | null;
    owner: null;
    authors: string[];
    artists: string[];
    publishers: string[];
}
