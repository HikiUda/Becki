import { z } from 'zod';

const RangeFromToScheme = z.coerce.number().int().optional();
const RateFromToScheme = z.coerce.number().min(0).max(10).optional();
const releaseDateFromToScheme = z.coerce.date().optional();

export const RangeScheme = z.object({
    ageRateFrom: RangeFromToScheme,
    ageRateTo: RangeFromToScheme,
    chapterCountFrom: RangeFromToScheme,
    chapterCountTo: RangeFromToScheme,
    rateCountFrom: RangeFromToScheme,
    rateCountTo: RangeFromToScheme,
    rateFrom: RateFromToScheme,
    rateTo: RateFromToScheme,
    releaseDateFrom: releaseDateFromToScheme,
    releaseDateTo: releaseDateFromToScheme,
});

type RangeType = z.infer<typeof RangeScheme>;

export const refineRanges = (data: RangeType, ctx: z.RefinementCtx) => {
    if (data.ageRateFrom && data.ageRateTo && data.ageRateFrom > data.ageRateTo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'ageRateFrom dont be bigger than ageRateTo',
        });
    }
    if (
        data.chapterCountFrom &&
        data.chapterCountTo &&
        data.chapterCountFrom > data.chapterCountTo
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'chapterCountFrom dont be bigger than chapterCountTo',
        });
    }
    if (data.rateCountFrom && data.rateCountTo && data.rateCountFrom > data.rateCountTo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'rateCountFrom dont be bigger than rateCountTo',
        });
    }
    if (data.rateFrom && data.rateTo && data.rateFrom > data.rateTo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'rateFrom dont be bigger than rateTo',
        });
    }
    if (data.releaseDateFrom && data.releaseDateTo && data.releaseDateFrom > data.releaseDateTo) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'releaseDateFrom dont be bigger than releaseDateTo',
        });
    }
};
