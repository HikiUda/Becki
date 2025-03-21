import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';
import { UserBase } from 'src/modules/user/common/dto/user.dto';

export interface MangaTitle {
    ru: string;
    en: string | null;
}

export interface MangaDto {
    id: number;
    urlId: string;
    title: MangaTitle;
    description: string;
    chaptersCount: number;
    rate: number;
    countRate: number;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    janres: string[];
    tags: string[];
    cover: string | null;
    banner: string | null;
    owner: UserBase;
    authors: string[];
    artists: string[];
    publishers: string[];
    bookmark: Bookmarks | null;
}
