import { MangaStatus, MangaType } from '@prisma/client';

interface EditedTitle {
    id: number;
    ru: string;
    en: string | null;
    main: boolean;
}

interface EditedDescription {
    ru: string;
    en: string | null;
}

interface EditedjanresAndTags {
    id: number;
    title: string;
}
interface EditedAuthors {
    id: number;
    name: string;
}

interface EditedCovers {
    id: number;
    cover: string;
}

export interface EditedMangaDto {
    id: number;
    titles: EditedTitle[];
    description: EditedDescription;
    releaseDate: Date | null;
    status: MangaStatus;
    type: MangaType;
    janres: EditedjanresAndTags[];
    tags: EditedjanresAndTags[];
    covers: EditedCovers[];
    banner: string | null;
    authors: EditedAuthors[];
    artists: EditedAuthors[];
    publishers: EditedAuthors[];
}
