import { NotAcceptableException } from '@nestjs/common';
import { isNotLessThenZeroAndNotNan } from 'src/common/helpers/isNotLessThenZeroAndNotNan/isNotLessThenZeroAndNotNan';

export const stringIdsToIntArray = (str: string | undefined): number[] => {
    return str
        ? str
              .split(',')
              .map((id) => Number(id))
              .filter((id) => id !== 0)
        : [];
};
export const noneNaNInArray = (arr: number[]) => {
    if (arr.includes(NaN))
        throw new NotAcceptableException('id жанров и тегов могут быть только целые числа');
};
export const validInteger = (strNum: string, nameFeild?: string) => {
    const num = Number(strNum);

    if (!isNotLessThenZeroAndNotNan(num))
        throw new NotAcceptableException(
            `Поле ${nameFeild ? nameFeild : '###'} должно быть числом не меньше нуля`,
        );
    return num;
};

export const fromNotGreetThenTo = (from: number, to: number, commonFieldName: string) => {
    if (from > to) {
        throw new NotAcceptableException(
            `Поле ${commonFieldName}From должно быть не больше ${commonFieldName}To`,
        );
    }
};
