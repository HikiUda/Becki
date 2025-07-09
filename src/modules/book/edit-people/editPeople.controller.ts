import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { EditPeopleControllerInterface } from './interfaces/editPeopleController';
import { EditPeopleService } from './editPeople.service';
import { PersonIdParam } from '../_common/model/people';
import { CreatePersonDto, ParseBodyCreatePersonDto } from './dto/createPerson.dto';
import { EditedPerson } from './dto/editedPerson.dto';
import { ParseBodyUpdatePersonDto, UpdatePersonDto } from './dto/updatePerson.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { ApiCustomNotFoundResponse } from 'src/shared/decorators/api40xResponses';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiMutatePerson } from './ApiMutatePerson';

@ApiBearerAuth()
@Controller('people')
export class EditPeopleController implements EditPeopleControllerInterface {
    constructor(private service: EditPeopleService) {}

    @Get(':personId/edit')
    @ApiOkResponse({ type: EditedPerson })
    @ApiCustomNotFoundResponse()
    async getEditedPerson(@Param() params: PersonIdParam): Promise<EditedPerson> {
        return await this.service.getEditedPerson(params.personId);
    }

    @Post()
    @ApiMutatePerson(CreatePersonDto)
    @UseInterceptors(FileInterceptor('avatar'))
    async createPerson(
        @Body('body') body: ParseBodyCreatePersonDto,
        @UploadedFile() avatar?: Express.Multer.File,
    ): Promise<void> {
        await this.service.createPerson(body, avatar);
        return;
    }

    @Put(':personId/edit')
    @ApiMutatePerson(UpdatePersonDto)
    @UseInterceptors(FileInterceptor('avatar'))
    async updatePerson(
        @Param() params: PersonIdParam,
        @Body('body') body: ParseBodyUpdatePersonDto,
        @UploadedFile() avatar?: Express.Multer.File,
    ): Promise<void> {
        await this.service.updatePerson(params.personId, body, avatar);
        return;
    }
}
