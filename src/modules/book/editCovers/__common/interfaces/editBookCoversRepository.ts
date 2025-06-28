import { EditedBookCover } from '../dto/editedBookCovers.dto';

export interface EditBookCoversRepositoryInterface {
    getEditedCovers: (bookId: number) => Promise<EditedBookCover[]>;
    addCovers: (bookId: number, covers: string[]) => Promise<void>;
    deleteCovers: (coversId: number[]) => Promise<void>;
}
