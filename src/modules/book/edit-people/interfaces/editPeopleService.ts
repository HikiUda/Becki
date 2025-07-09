import { PersonId } from '../../_common/model/people';
import { CreatePersonDto } from '../dto/createPerson.dto';
import { EditedPerson } from '../dto/editedPerson.dto';
import { UpdatePersonDto } from '../dto/updatePerson.dto';

export interface EditPeopleServiceInterface {
    getEditedPerson: (personId: PersonId) => Promise<EditedPerson>;
    createPerson: (data: CreatePersonDto, avatar?: Express.Multer.File) => Promise<void>;
    updatePerson: (
        personId: PersonId,
        data: UpdatePersonDto,
        avatar?: Express.Multer.File,
    ) => Promise<void>;
}
