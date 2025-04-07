import { ReturnAuthUser } from '../types/user';

export const mockAuthUser: ReturnAuthUser = {
    user: {
        sub: 1,
        id: 1,
        name: 'name',
        login: 'login',
    },
    tokens: {
        access: 'access',
        refresh: 'refresh',
    },
};
