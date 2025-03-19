import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaControllerInterface } from './interfaces/editMangaController';
import { EditMangaService } from './editManga.service';
import { LangType } from 'src/common/types/lang';
import { EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MangaFilesUploadType } from './types/fileUpload';

@Controller('manga/edit')
export class EditMangaController implements EditMangaControllerInterface {
    constructor(private editMangaService: EditMangaService) {}
    @Get(':id')
    async getEditedManga(
        @Param('id', ParseIntPipe) id: number,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.getEditedManga(id, lang);
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'covers', maxCount: 5 },
            { name: 'banner', maxCount: 1 },
        ]),
    )
    async createManga(
        @Body('body') body: string,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
        @UploadedFiles() files: MangaFilesUploadType,
    ): Promise<EditedMangaDto> {
        //TODO pipe for validate dto *body have one title with {main: true}
        const dto = (await JSON.parse(body)) as MutateMangaDto;
        return await this.editMangaService.createManga(dto, lang, files);
    }
}
