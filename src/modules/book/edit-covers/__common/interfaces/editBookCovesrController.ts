import { EditedBookCoverList } from '../dto/editedBookCovers.dto';
import { DeleteBookCoversDto } from '../dto/deleteBookCovers.dto';
import { SetMainCoverParamsDto } from '../dto/setMainCoverParams.dto';

export interface EditBookCoversControllerInterface {
    getEditedCovers: (bookId: number) => Promise<EditedBookCoverList>;
    addCovers: (bookId: number, files: Express.Multer.File[]) => Promise<void>;
    setMainCover: (params: SetMainCoverParamsDto) => Promise<void>;
    deleteCovers: (bookId: number, body: DeleteBookCoversDto) => Promise<void>;
}
