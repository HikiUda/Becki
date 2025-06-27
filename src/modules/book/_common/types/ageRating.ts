import { z } from 'zod';

export const AgeRating = {
    0: 0,
    6: 6,
    12: 12,
    16: 16,
    18: 18,
} as const;

export const AgeRatingEnum = z.union([
    z.literal(0),
    z.literal(6),
    z.literal(12),
    z.literal(16),
    z.literal(18),
]);
export type AgeRating = z.infer<typeof AgeRatingEnum>;
