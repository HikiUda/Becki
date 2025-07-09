import { PersonId } from '../../_common/model/people';
import { CreatePersonDto } from '../dto/createPerson.dto';
import { EditedPerson } from '../dto/editedPerson.dto';
import { UpdatePersonDto } from '../dto/updatePerson.dto';

export interface EditPeopleRepositoryInterface {
    getEditedPerson: (personId: PersonId) => Promise<EditedPerson>;
    createPerson: (data: CreatePersonDto) => Promise<{ personId: PersonId; isExist: boolean }>;
    updatePerson: (personId: PersonId, data: UpdatePersonDto, avatar?: string) => Promise<void>;
    getAvatar: (personId: PersonId) => Promise<string | null>;
}
