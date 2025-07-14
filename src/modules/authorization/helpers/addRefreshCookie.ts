import { Response } from 'express';

export const RefreshCookieName = 'refresh';

export function addRefreshCookie(res: Response, refresh: string): Response {
    res.cookie(RefreshCookieName, refresh, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res;
}
