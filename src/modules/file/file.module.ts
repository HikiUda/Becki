import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileLocalRepository } from './fileLocal.repository';
import { MangaFileService } from './services/mangaFile.service';
import { RanobeFileService } from './services/ranobeFile.service';
import { PeopleFileService } from './services/peopleFile.service';

// TODO delete FileService
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'static'),
        }),
    ],
    providers: [FileLocalRepository, MangaFileService, RanobeFileService, PeopleFileService],
    exports: [MangaFileService, RanobeFileService, PeopleFileService],
})
export class FileModule {}
