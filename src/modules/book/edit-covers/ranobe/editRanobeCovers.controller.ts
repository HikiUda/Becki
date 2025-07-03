import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { ApiCustomBadRequestResponse } from 'src/shared/decorators/api40xResponses';
import { EditedBookCoverList } from '../__common/dto/editedBookCovers.dto';
import { DeleteBookCoversDto } from '../__common/dto/deleteBookCovers.dto';
import { EditBookCoversControllerInterface } from '../__common/interfaces/editBookCoversController';
import { ApiAddCovers } from '../__common/ApiAddCovers';
import { EditRanobeCoversService } from './editRanobeCovers.service';
import { SetMainRanobeCoverParams } from '../__common/dto/setMainCoverParams.dto';
import { RanobeIdParam } from '../../_common/model/bookId';

@Controller('ranobe/:ranobeId/edit/covers')
export class EditRanobeCoversController implements EditBookCoversControllerInterface {
    constructor(private service: EditRanobeCoversService) {}

    @Get()
    @ApiOkResponse({ type: EditedBookCoverList })
    async getEditedCovers(@Param() params: RanobeIdParam): Promise<EditedBookCoverList> {
        return await this.service.getEditedCovers(params.ranobeId);
    }

    @Post()
    @ApiAddCovers()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FilesInterceptor('covers', 5))
    async addCovers(
        @Param() params: RanobeIdParam,
        @UploadedFiles() covers: Express.Multer.File[],
    ): Promise<void> {
        if (!covers.length)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        await this.service.addCovers(params.ranobeId, covers);
        return;
    }

    @Patch(':coverId')
    @ApiResponse({ status: 204 })
    async setMainCover(@Param() params: SetMainRanobeCoverParams): Promise<void> {
        await this.service.setMainCover(params.ranobeId, params.coverId);
        return;
    }

    @Delete()
    @ApiResponse({ status: 204 })
    async deleteCovers(
        @Param() params: RanobeIdParam,
        @Body() body: DeleteBookCoversDto,
    ): Promise<void> {
        await this.service.deleteCovers(params.ranobeId, body.coversId);
        return;
    }
}
