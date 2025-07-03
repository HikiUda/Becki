import { EditedBookCoverList } from '../dto/editedBookCovers.dto';
import { DeleteBookCoversDto } from '../dto/deleteBookCovers.dto';
import { SetMainCoverParams } from '../dto/setMainCoverParams.dto';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';

export interface EditBookCoversControllerInterface {
    getEditedCovers: (params: BookIdParam) => Promise<EditedBookCoverList>;
    addCovers: (params: BookIdParam, files: Express.Multer.File[]) => Promise<void>;
    setMainCover: (params: SetMainCoverParams) => Promise<void>;
    deleteCovers: (params: BookIdParam, body: DeleteBookCoversDto) => Promise<void>;
}
