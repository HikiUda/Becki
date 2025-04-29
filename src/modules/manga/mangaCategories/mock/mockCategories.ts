import { CategoriesResponseArrayData, CategoryDto } from '../dto/category.dto';

export const mockCategory: CategoryDto = {
    id: 0,
    title: 'Category',
};

export const mockCategoriesResponseArrayData: CategoriesResponseArrayData = {
    data: [mockCategory, mockCategory, mockCategory],
};
