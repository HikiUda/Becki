import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    NotAcceptableException,
} from '@nestjs/common';
import { MangaListGetQuery, MangaListQuery } from '../../publicManga/dto/mangaListItem.dto';
import { MangaStatus, MangaType } from '@prisma/client';
import { isValidDate } from 'src/common/helpers/isValidDate';

@Injectable()
export class ValidateMangaListQueryPipe implements PipeTransform<MangaListGetQuery> {
    transform(value: MangaListGetQuery, metadata: ArgumentMetadata) {
        const query: MangaListQuery = {
            page: value.page || 1,
            limit: value.limit || 10,
            order: value.order || 'asc',
            janres: value.janres ? value.janres.split(',') : [],
            tags: value.tags ? value.tags.split(',') : [],
        };
        if (value.search) query.search = value.search;
        if (value.status) {
            if (!MangaStatus[value.status])
                throw new NotAcceptableException('Такого статуса тайтла не существует. (status)');
            query.status = value.status;
        }
        if (value.type) {
            if (!MangaType[value.type])
                throw new NotAcceptableException('Такого типа тайтла не существует. (type)');
            query.type = value.type;
        }
        if (value.chapterCountFrom) {
            query.chapterCountFrom = Number(value.chapterCountFrom);
            if (isNaN(query.chapterCountFrom))
                throw new NotAcceptableException('Поле chapterCountFrom должно быть числом');
        }
        if (value.chapterCountTo) {
            query.chapterCountTo = Number(value.chapterCountTo);
            if (isNaN(query.chapterCountTo))
                throw new NotAcceptableException('Поле chapterCountTo должно быть числом');
        }
        if (value.releaseDateFrom) {
            const date = new Date(value.releaseDateFrom);
            if (!isValidDate(date))
                throw new NotAcceptableException('Неправильный формат даты (releaseDateFrom)');
            query.releaseDateFrom = date;
        }
        if (value.releaseDateTo) {
            const date = new Date(value.releaseDateTo);
            if (!isValidDate(date))
                throw new NotAcceptableException('Неправильный формат даты (releaseDateTo)');
            query.releaseDateTo = date;
        }
        if (value.rateFrom) {
            const rateFrom = Number(value.rateFrom);
            if (rateFrom < 0 || rateFrom > 10)
                throw new NotAcceptableException(
                    'Поле rateFrom должно быть не больше 10 и не меньше 0',
                );
            query.rateFrom = rateFrom;
        }
        if (value.rateTo) {
            const rateTo = Number(value.rateTo);
            if (rateTo < 0 || rateTo > 10)
                throw new NotAcceptableException(
                    'Поле rateTo должно быть не больше 10 и не меньше 0',
                );
            query.rateTo = rateTo;
        }
        if (value.rateCountFrom) {
            query.rateCountFrom = Number(value.rateCountFrom);
            if (isNaN(query.rateCountFrom))
                throw new NotAcceptableException('Поле rateCountFrom должно быть числом');
        }
        if (value.rateCountTo) {
            query.rateCountTo = Number(value.rateCountTo);
            if (isNaN(query.rateCountTo))
                throw new NotAcceptableException('Поле rateCountTo должно быть числом');
        }
        if (value.ageRateFrom) {
            query.ageRateFrom = Number(value.ageRateFrom);
            if (isNaN(query.ageRateFrom))
                throw new NotAcceptableException('Поле ageRateFrom должно быть числом');
        }
        if (value.ageRateTo) {
            query.ageRateTo = Number(value.ageRateTo);
            if (isNaN(query.ageRateTo))
                throw new NotAcceptableException('Поле ageRateTo должно быть числом');
        }
        //TODO bookmarks?: Bookmarks[];

        return query;
    }
}
