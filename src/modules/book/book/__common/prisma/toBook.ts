import { PeopleRole, Prisma, PrismaClient } from '@prisma/client';
import { getBookSelect } from './getBookSelect';
import { Book, BookPerson } from '../dto/book.dto';
import { AgeRating } from 'src/modules/book/_common/model/ageRating';
import { GetBookCategories } from './getBookCategories';

const getBook = async (prisma: PrismaClient) => {
    return await prisma.book.findUnique({
        where: { id: 0 },
        select: getBookSelect(),
    });
};
type GetBook = Exclude<Prisma.PromiseReturnType<typeof getBook>, null>;

function toBookPerson(person: GetBook['authors'][number], role: PeopleRole): BookPerson {
    return {
        id: person.id,
        name: person.name,
        avatar: person.avatar,
        role: [role],
    };
}

function toBookPeople({
    authors,
    artists,
    publishers,
}: {
    authors: GetBook['authors'];
    artists: GetBook['artists'];
    publishers: GetBook['publishers'];
}) {
    const people: BookPerson[] = authors.map((author) => toBookPerson(author, 'Author'));

    artists.forEach((artist) => {
        const isDub = people.findIndex((person) => artist.id === person.id);
        if (isDub === -1) people.push(toBookPerson(artist, 'Artist'));
        people[isDub] = { ...people[isDub], role: [...people[isDub].role, 'Artist'] };
    });
    publishers.forEach((publisher) => {
        const isDub = people.findIndex((person) => publisher.id === person.id);
        if (isDub === -1) people.push(toBookPerson(publisher, 'Publisher'));
        people[isDub] = { ...people[isDub], role: [...people[isDub].role, 'Publisher'] };
    });

    return people;
}

export function toBook<T extends string>(
    book: GetBook & { type: T },
    categories: GetBookCategories,
): Book & { type: T } {
    return {
        id: book.id,
        urlId: book.urlId,
        title: {
            main: book.title?.main || '',
            en: book.title?.en || null,
            origin: book.title?.origin || null,
        },
        otherTitles: book.title?.otherTitles?.split('\n').filter(Boolean) || [],
        description: book.description,
        rate: book.statistic?.rate || 0,
        rateCount: book.statistic?.rateCount || 0,
        releaseDate: book.releaseDate,
        ageRating: book.ageRating as AgeRating,
        status: book.status,
        type: book.type,
        genres: categories.genres,
        tags: categories.tags,
        cover: book.covers[0]?.cover || null,
        banner: book.banner,
        owner: { id: book.owner.id, name: book.owner.name, avatar: book.owner.avatar },
        people: toBookPeople(book),
        lang: book.lang,
    };
}
