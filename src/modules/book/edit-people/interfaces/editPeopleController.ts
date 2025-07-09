import { PersonIdParam } from '../../_common/model/people';
import { ParseBodyCreatePersonDto } from '../dto/createPerson.dto';
import { EditedPerson } from '../dto/editedPerson.dto';
import { ParseBodyUpdatePersonDto } from '../dto/updatePerson.dto';

export interface EditPeopleControllerInterface {
    getEditedPerson: (params: PersonIdParam) => Promise<EditedPerson>;
    createPerson: (body: ParseBodyCreatePersonDto, avatar?: Express.Multer.File) => Promise<void>;
    updatePerson: (
        params: PersonIdParam,
        body: ParseBodyUpdatePersonDto,
        avatar?: Express.Multer.File,
    ) => Promise<void>;
}
