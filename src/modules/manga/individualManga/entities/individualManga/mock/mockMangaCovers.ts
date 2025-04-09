import { MangaCoverArrayData, MangaCoverDto } from '../dto/mangaCovers.dto';

export const mockMangaCover: MangaCoverDto = {
    id: 1,
    cover: 'http://wrong-way.com',
};

export const mockMangaCoverArrayData: MangaCoverArrayData = {
    data: Array(3).fill(mockMangaCover),
};
