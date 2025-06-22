import { z } from 'zod';

const RangeFromToScheme = z.coerce.number().int().optional();
const RateFromToScheme = z.coerce.number().min(0).max(10).optional();
const releaseDateFromToScheme = z.coerce.date().optional();

export const RangeScheme = z.object({
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

function fromBiggerTo(from: number | undefined, to: number | undefined) {
    if (!from || !to) return false;
    if (from <= to) return false;
    return true;
}

export const refineRanges = (data: RangeType, ctx: z.RefinementCtx) => {
    if (fromBiggerTo(data.chapterCountFrom, data.chapterCountTo)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'chapterCountFrom dont be bigger than chapterCountTo',
        });
    }
    if (fromBiggerTo(data.rateCountFrom, data.rateCountTo)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'rateCountFrom dont be bigger than rateCountTo',
        });
    }
    if (fromBiggerTo(data.rateFrom, data.rateTo)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'rateFrom dont be bigger than rateTo',
        });
    }
    if (fromBiggerTo(data.releaseDateFrom?.getTime(), data.releaseDateTo?.getTime())) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'releaseDateFrom must not be later than releaseDateTo',
        });
    }
};
