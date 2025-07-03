import { BookId } from 'src/modules/book/_common/model/bookId';
import { EditedBookCoverList } from '../dto/editedBookCovers.dto';
import { BookCoverId } from '../dto/setMainCoverParams.dto';

export interface EditBookCoversServiceInterface {
    getEditedCovers: (bookId: BookId) => Promise<EditedBookCoverList>;
    addCovers: (bookId: BookId, covers: Express.Multer.File[]) => Promise<void>;
    setMainCover: (bookId: BookId, coverId: BookCoverId) => Promise<void>;
    deleteCovers: (bookId: BookId, coversId: number[]) => Promise<void>;
}
