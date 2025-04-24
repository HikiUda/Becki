import { EditedMangaCover, EditedMangaCoverResponseArrayData } from '../dto/editedMangaCover.dto';

export const mockEditedMangaCover: EditedMangaCover = {
    id: 0,
    cover: 'http://wrong-way.com',
    main: false,
};
export const mockEditedMangaCovers: EditedMangaCover[] = [
    mockEditedMangaCover,
    mockEditedMangaCover,
    mockEditedMangaCover,
];
export const mockEditedMangaCoversResponseArrayData: EditedMangaCoverResponseArrayData = {
    data: [mockEditedMangaCover, mockEditedMangaCover, mockEditedMangaCover],
};
