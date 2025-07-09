import { Injectable } from '@nestjs/common';
import { EditPeopleServiceInterface } from './interfaces/editPeopleService';
import { EditPeopleRepository } from './editPeople.repository';
import { PeopleFileService } from 'src/modules/file/services/peopleFile.service';
import { PersonId } from '../_common/model/people';
import { CreatePersonDto } from './dto/createPerson.dto';
import { EditedPerson } from './dto/editedPerson.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';

@Injectable()
export class EditPeopleService implements EditPeopleServiceInterface {
    constructor(
        private repository: EditPeopleRepository,
        private fileService: PeopleFileService,
    ) {}

    async getEditedPerson(personId: PersonId): Promise<EditedPerson> {
        return this.repository.getEditedPerson(personId);
    }

    async createPerson(data: CreatePersonDto, avatar?: Express.Multer.File): Promise<void> {
        const { personId, isExist } = await this.repository.createPerson(data);
        if (!isExist && avatar) {
            await this.updatePerson(personId, {}, avatar);
        }
        return;
    }

    async updatePerson(
        personId: PersonId,
        data: UpdatePersonDto,
        avatar?: Express.Multer.File,
    ): Promise<void> {
        if (avatar) {
            const prevAvatar = await this.repository.getAvatar(personId);
            if (prevAvatar) await this.fileService.deleteAvatar(prevAvatar);
            const savedAvatar = await this.fileService.saveAvatar(personId, avatar);
            await this.repository.updatePerson(personId, data, savedAvatar);
            return;
        }
        await this.repository.updatePerson(personId, data);
        return;
    }
}
