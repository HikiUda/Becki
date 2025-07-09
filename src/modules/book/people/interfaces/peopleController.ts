import { LangQuery } from 'src/shared/dto/langQuery.dto';
import { PeopleList, PeopleListQuery } from '../dto/peopleList.dto';
import { Person } from '../dto/person.dto';

export interface PeopleControllerInterface {
    getPeopleList: (query: PeopleListQuery) => Promise<PeopleList>;
    getPerson: (name: string, query: LangQuery) => Promise<Person>;
}
