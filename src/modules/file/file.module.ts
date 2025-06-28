import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileService } from './file.service';
import { FileLocalRepository } from './fileLocal.repository';
import { MangaFileService } from './mangaFile.service';
import { RanobeFileService } from './ranobeFile.service';

// TODO delete FileService
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'static'),
        }),
    ],
    providers: [FileService, FileLocalRepository, MangaFileService, RanobeFileService],
    exports: [FileService, MangaFileService, RanobeFileService],
})
export class FileModule {}
