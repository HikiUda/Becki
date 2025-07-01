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
import { ValidateBookIdPipe } from '../../_common/pipes/validateBookIdPipe';
import { DeleteBookCoversDto } from '../__common/dto/deleteBookCovers.dto';
import { EditBookCoversControllerInterface } from '../__common/interfaces/editBookCoversController';
import { ApiAddCovers } from '../__common/ApiAddCovers';
import { EditRanobeCoversService } from './editRanobeCovers.service';
import { SetMainRanobeCoverParamsDto } from '../__common/dto/setMainCoverParams.dto';
import { ApiBookIdParam } from '../../_common/decorators/ApiBookIdParam';

@Controller('ranobe/:ranobeId/edit/covers')
export class EditRanobeCoversController implements EditBookCoversControllerInterface {
    constructor(private service: EditRanobeCoversService) {}

    @Get()
    @ApiBookIdParam('ranobeId')
    @ApiOkResponse({ type: EditedBookCoverList })
    async getEditedCovers(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
    ): Promise<EditedBookCoverList> {
        return await this.service.getEditedCovers(bookId);
    }

    @Post()
    @ApiBookIdParam('ranobeId')
    @ApiAddCovers()
    @ApiCustomBadRequestResponse()
    @UseInterceptors(FilesInterceptor('covers', 5))
    async addCovers(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @UploadedFiles() covers: Express.Multer.File[],
    ): Promise<void> {
        if (!covers.length)
            throw new BadRequestException('В запросе должна быть как минимум одна обложка(cover).');
        await this.service.addCovers(bookId, covers);
        return;
    }

    @Patch(':coverId')
    @ApiBookIdParam('ranobeId')
    @ApiResponse({ status: 204 })
    async setMainCover(@Param() params: SetMainRanobeCoverParamsDto): Promise<void> {
        await this.service.setMainCover(params.ranobeId, params.coverId);
        return;
    }

    @Delete()
    @ApiBookIdParam('ranobeId')
    @ApiResponse({ status: 204 })
    async deleteCovers(
        @Param('ranobeId', new ValidateBookIdPipe()) bookId: number,
        @Body() body: DeleteBookCoversDto,
    ): Promise<void> {
        await this.service.deleteCovers(bookId, body.coversId);
        return;
    }
}
