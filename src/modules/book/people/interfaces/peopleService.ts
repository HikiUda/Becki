import { Lang } from 'src/shared/dto/langQuery.dto';
import { PeopleList, PeopleListQuery } from '../dto/peopleList.dto';
import { Person } from '../dto/person.dto';

export interface PeopleServiceInterface {
    getPeopleList: (query: PeopleListQuery) => Promise<PeopleList>;
    getPerson: (name: string, lang: Lang) => Promise<Person>;
}
