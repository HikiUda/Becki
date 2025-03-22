import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { MutateMangaDto } from '../../editManga/dto/mutateManga.dto';

@Injectable()
export class ValidateCreateMangaBodyPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): MutateMangaDto {
        const dto = JSON.parse(value) as MutateMangaDto;
        if (!dto.titles?.createTitles?.length)
            throw new BadRequestException('Должен быть как минимум одно название тайтла');
        if (!dto.titles.createTitles.some((title) => title.main)) {
            dto.titles.createTitles[0].main = true;
        }
        return dto;
    }
}
