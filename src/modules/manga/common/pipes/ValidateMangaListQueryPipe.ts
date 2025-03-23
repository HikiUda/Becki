import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    NotAcceptableException,
} from '@nestjs/common';
import { MangaListGetQuery, MangaListQuery } from '../../publicManga/dto/mangaListItem.dto';
import { MangaStatus, MangaType } from '@prisma/client';
import { isValidDate } from 'src/common/helpers/isValidDate';
import { isNotLessThenZeroAndNotNan } from 'src/common/helpers/isNotLessThenZeroAndNotNan/isNotLessThenZeroAndNotNan';

@Injectable()
export class ValidateMangaListQueryPipe implements PipeTransform<MangaListGetQuery> {
    transform(value: MangaListGetQuery, metadata: ArgumentMetadata) {
        const query: MangaListQuery = {
            page: Number(value.page) || 1,
            limit: Number(value.limit) || 10,
            order: value.order || 'asc',
            sortBy: value.sortBy || 'popularity',
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

        // Validate ChapterCount
        if (value.chapterCountFrom) {
            const chapterCountFrom = Number(value.chapterCountFrom);
            if (!isNotLessThenZeroAndNotNan(chapterCountFrom))
                throw new NotAcceptableException(
                    'Поле chapterCountFrom должно быть числом не меньше нуля',
                );
            query.chapterCountFrom = chapterCountFrom;
        }
        if (value.chapterCountTo) {
            const chapterCountTo = Number(value.chapterCountTo);
            if (!isNotLessThenZeroAndNotNan(chapterCountTo))
                throw new NotAcceptableException(
                    'Поле chapterCountTo должно быть числом не меньше нуля',
                );
            query.chapterCountTo = chapterCountTo;
        }
        if (
            query.chapterCountFrom &&
            query.chapterCountTo &&
            query.chapterCountFrom > query.chapterCountTo
        ) {
            throw new NotAcceptableException(
                'Поле chapterCountFrom должно быть не больше chapterCountTo',
            );
        }

        // Validate ReleaseDate
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

        // Validate Rate
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

        // Validate RateCount
        if (value.rateCountFrom) {
            const rateCountFrom = Number(value.rateCountFrom);
            if (!isNotLessThenZeroAndNotNan(rateCountFrom))
                throw new NotAcceptableException(
                    'Поле rateCountFrom должно быть числом не меньше нуля',
                );
            query.rateCountFrom = rateCountFrom;
        }
        if (value.rateCountTo) {
            const rateCountTo = Number(value.rateCountTo);
            if (!isNotLessThenZeroAndNotNan(rateCountTo))
                throw new NotAcceptableException(
                    'Поле rateCountTo должно быть числом не меньше нуля',
                );
            query.rateCountTo = rateCountTo;
        }
        if (query.rateCountFrom && query.rateCountTo && query.rateCountFrom > query.rateCountTo) {
            throw new NotAcceptableException(
                'Поле rateCountFrom должно быть не больше rateCountTo',
            );
        }

        // Validate Age
        if (value.ageRateFrom) {
            const ageRateFrom = Number(value.ageRateFrom);
            if (!isNotLessThenZeroAndNotNan(ageRateFrom))
                throw new NotAcceptableException(
                    'Поле ageRateFrom должно быть числом не меньше нуля',
                );
            query.ageRateFrom = ageRateFrom;
        }
        if (value.ageRateTo) {
            const ageRateTo = Number(value.ageRateTo);
            if (!isNotLessThenZeroAndNotNan(ageRateTo))
                throw new NotAcceptableException(
                    'Поле ageRateTo должно быть числом не меньше нуля',
                );
            query.ageRateTo = ageRateTo;
        }
        if (query.ageRateFrom && query.ageRateTo && query.ageRateFrom > query.ageRateTo) {
            throw new NotAcceptableException('Поле ageRateFrom должно быть не больше ageRateTo');
        }
        //TODO bookmarks?: Bookmarks[];

        return query;
    }
}
