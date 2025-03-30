import { MangaListItemBaseDto } from './mangaListItemBase.dto';

export type MangaListItemStatisticDto = Pick<
    MangaListItemBaseDto,
    'id' | 'urlId' | 'title' | 'type' | 'cover' | 'views' | 'likes' | 'bookmarks'
>;
