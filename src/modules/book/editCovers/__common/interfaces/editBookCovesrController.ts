import { EditedBookCoverList } from '../dto/editedBookCovers.dto';
import { DeleleBookCoversDto } from '../dto/deleteBookCovers.dto';

export interface EditBookCoversControllerInterface {
    getEditedCovers: (bookId: number) => Promise<EditedBookCoverList>;
    addCovers: (id: number, files: Express.Multer.File[]) => Promise<void>;
    deleteCovers: (body: DeleleBookCoversDto) => Promise<void>;
}
