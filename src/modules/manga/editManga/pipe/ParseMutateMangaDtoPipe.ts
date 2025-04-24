import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {
    MutateMangaScheme,
    MutateMangaType,
} from '../entities/editManga/dto/mutateManga/mutateManga.dto';

@Injectable()
export class ParseMutateMangaDtoPipe implements PipeTransform<unknown> {
    transform(value: unknown, metadata: ArgumentMetadata): MutateMangaType {
        return MutateMangaScheme.parse(value);
    }
}
