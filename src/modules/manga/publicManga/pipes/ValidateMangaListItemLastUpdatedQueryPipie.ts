import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { MangaListItemLastUpdatedQueryDto } from '../dto/mangaListItem/mangaListItemLastUpdated.dto';

@Injectable()
export class ValidateMangaListItemLastUpdatedQueryDtoPipe implements PipeTransform<any> {
    transform(query: any, metadata: ArgumentMetadata) {
        const validQuery: MangaListItemLastUpdatedQueryDto = {
            scope: query.scope ? query.scope : 'all',
            lang: query.lang ? query.lang : 'ru',
            page: Number(query.page) || 1,
            limit: Number(query.limit) || 10,
        };
        return validQuery;
    }
}
