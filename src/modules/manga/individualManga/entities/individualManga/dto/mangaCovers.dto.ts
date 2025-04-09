import { ResponseArrayData } from 'src/common/types/pagination';

export interface MangaCoverDto {
    id: number;
    cover: string;
}

export type MangaCoverArrayData = ResponseArrayData<MangaCoverDto>;
