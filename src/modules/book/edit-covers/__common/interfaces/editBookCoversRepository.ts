import { BookId } from 'src/modules/book/_common/model/bookId';
import { EditedBookCover } from '../dto/editedBookCovers.dto';
import { BookCoverId } from '../dto/setMainCoverParams.dto';

export interface EditBookCoversRepositoryInterface {
    getEditedCovers: (bookId: BookId) => Promise<EditedBookCover[]>;
    addCovers: (bookId: BookId, covers: string[]) => Promise<void>;
    setMainCover: (bookId: BookId, coverId: BookCoverId) => Promise<void>;
    deleteCovers: (bookId: BookId, coversId: number[]) => Promise<string[]>;
}
