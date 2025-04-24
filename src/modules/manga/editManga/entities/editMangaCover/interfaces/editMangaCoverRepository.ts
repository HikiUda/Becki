import { EditedMangaCover } from '../dto/editedMangaCover.dto';

export interface EditMangaCoverRepositoryInterface {
    getMangaCovers: (mangaId: number) => Promise<EditedMangaCover[]>;
    addCovers: (covers: string[], mangaId: number) => Promise<EditedMangaCover[]>;
    deleteCovers: (cover: number[]) => Promise<EditedMangaCover[]>;
}
