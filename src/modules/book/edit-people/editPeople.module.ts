import { Module } from '@nestjs/common';
import { EditPeopleController } from './editPeople.controller';
import { FileModule } from 'src/modules/file/file.module';
import { EditPeopleService } from './editPeople.service';
import { EditPeopleRepository } from './editPeople.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
    imports: [FileModule],
    controllers: [EditPeopleController],
    providers: [EditPeopleService, EditPeopleRepository, PrismaService],
})
export class EditPeopleModule {}
