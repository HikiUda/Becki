import { Bookmarks, MangaStatus, MangaType } from '@prisma/client';
import { UserBaseDto } from 'src/modules/user/profile/dto/userBase.dto';

export interface MangaTitle {
    ru: string;
    en: string | null;
    origin: string | null;
}

export interface MangaGenresAndTag {
    id: number;
    title: string;
}

export interface MangaDto {
    id: number;
    urlId: string;
    title: MangaTitle;
    otherTitles: string[];
    description: string;
    chaptersCount: number;
    rate: number;
    countRate: number;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    genres: MangaGenresAndTag[];
    tags: MangaGenresAndTag[];
    cover: string | null;
    banner: string | null;
    owner: UserBaseDto;
    authors: string[];
    artists: string[];
    publishers: string[];
    bookmark: Bookmarks | null;
}
