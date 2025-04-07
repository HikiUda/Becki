import { Response } from 'express';

export function addRefreshCookie(res: Response, refresh: string): Response {
    res.cookie('refresh', refresh, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res;
}
