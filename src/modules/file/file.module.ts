import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileService } from './file.service';
import { FileLocalRepository } from './fileLocal.repository';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', '..', 'static'),
        }),
    ],
    providers: [FileService, FileLocalRepository],
    exports: [FileService],
})
export class FileModule {}
