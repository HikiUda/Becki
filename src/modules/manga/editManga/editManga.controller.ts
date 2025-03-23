import {
    BadRequestException,
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { EditMangaControllerInterface } from './interfaces/editMangaController';
import { EditMangaService } from './editManga.service';
import { LangType } from 'src/common/types/lang';
import { EditedMangaCovers, EditedMangaDto } from './dto/editedmanga.dto';
import { MutateMangaDto } from './dto/mutateManga.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MangaFilesUploadType } from './types/fileUpload';
import { ValidateMangaIdPipe } from '../common/pipes/ValidateMangaIdPipe';
import { MangaIdsType } from '../common/types/mangaTypes';
import { ValidateCreateMangaBodyPipe } from '../common/pipes/ValidateCreateMangaBodyPipe';
//TODO edit ageRate
@Controller('manga/edit')
export class EditMangaController implements EditMangaControllerInterface {
    constructor(private editMangaService: EditMangaService) {}

    @Get(':id')
    async getEditedManga(
        @Param('id', new ValidateMangaIdPipe()) id: MangaIdsType,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.getEditedManga(id, lang);
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'banner', maxCount: 1 },
            { name: 'covers', maxCount: 1 },
        ]),
    )
    async createManga(
        @Body('body', new ValidateCreateMangaBodyPipe()) dto: MutateMangaDto,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
        @UploadedFiles() files: MangaFilesUploadType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.createManga(dto, lang, files);
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('banner'))
    async updateManga(
        @Param('id', ParseIntPipe) id: number,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
        @Body('body', new DefaultValuePipe('{}')) body: string,
        @UploadedFile() banner: Express.Multer.File,
    ): Promise<EditedMangaDto> {
        const dto = (await JSON.parse(body)) as MutateMangaDto;
        return await this.editMangaService.updateManga(dto, id, lang, banner);
    }
    @Delete(':id')
    async deleteManga(
        @Param('id', ParseIntPipe) id: number,
        @Query('lang', new DefaultValuePipe('ru')) lang: LangType,
    ): Promise<EditedMangaDto> {
        return await this.editMangaService.deleteManga(id, lang);
    }

    @Get(':id/cover')
    async getMangaCovers(@Param('id', ParseIntPipe) id: number): Promise<EditedMangaCovers[]> {
        return await this.editMangaService.getMangaCovers(id);
    }

    @Post(':id/cover')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'covers', maxCount: 5 }]))
    async addMangaCovers(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFiles() files: Omit<MangaFilesUploadType, 'banner'>,
    ): Promise<EditedMangaCovers[]> {
        if (!files?.covers)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        return await this.editMangaService.addMangaCovers(id, files.covers);
    }

    @Delete(':id/cover')
    async deleteMangaCovers(@Body('coversId') coversId: number[]): Promise<EditedMangaCovers[]> {
        return await this.editMangaService.deleteMangaCovers(coversId);
    }
}
