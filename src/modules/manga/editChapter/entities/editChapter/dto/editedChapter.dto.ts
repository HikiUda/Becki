export interface EditedChpaterDto {
    id: number;
    title: { ru: string | null; en: string | null };
    tome: number;
    chpater: number;
    private: boolean;
    mangaId: number;
}
