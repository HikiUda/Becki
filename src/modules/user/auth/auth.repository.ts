import { Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from './interfaces/authRepository';
import { AuthDataUser } from './types/user';
import { getAuthUser } from './prisma/getAuthUser';
import { CreateUserDto } from './dto/createUser.dto';
import { createUser } from './prisma/createUser';
import { saveAuthTokens } from './prisma/saveAuthTokens';
import { removeSession } from './prisma/removeSession';
import { getSession } from './prisma/getSession';
import { createSession } from './prisma/createSession';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor() {}

    async createUser(dto: CreateUserDto): Promise<AuthDataUser> {
        return await createUser(dto);
    }
    async getAuthUser(login: string): Promise<AuthDataUser | null> {
        return await getAuthUser(login);
    }
    async getSession(sessionId: number): Promise<string | null> {
        const session = await getSession(sessionId);
        return session ? session.refresh : null;
    }
    async createSession(userId: number): Promise<number> {
        const session = await createSession(userId);
        return session.id;
    }
    async removeSession(sessionId: number): Promise<any> {
        return await removeSession(sessionId);
    }
    async saveAuthTokens(refresh: string, sessionId: number): Promise<string> {
        const session = await saveAuthTokens(refresh, sessionId);
        return session.refresh;
    }
}
