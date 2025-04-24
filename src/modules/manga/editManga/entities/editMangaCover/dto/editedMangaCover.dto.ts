import { ResponseArrayData } from 'src/common/types/pagination';

export interface EditedMangaCover {
    id: number;
    cover: string;
    main: boolean;
}

export type EditedMangaCoverResponseArrayData = ResponseArrayData<EditedMangaCover>;
