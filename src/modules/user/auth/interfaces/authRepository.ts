import { CreateUserDto } from '../dto/createUser.dto';
import { AuthDataUser } from '../types/user';

export interface AuthRepositoryInterface {
    getAuthUser: (login: string) => Promise<AuthDataUser | null>;
    createUser: (dto: CreateUserDto) => Promise<AuthDataUser>;
    saveAuthTokens: (refresh: string, sessionId: number) => Promise<string>;
    removeSession: (sessionId: number) => Promise<any>;
    createSession: (userId: number) => Promise<number>;
    getSession: (sessionId: number) => Promise<string | null>;
}
