import { CreateUserDto } from '../dto/createUser.dto';
import { AuthUserData, RefreshToken, SessionId, UserId } from '../dto/user.dto';

export interface AuthRepositoryInterface {
    getAuthUser: (login: string) => Promise<AuthUserData | null>;
    createUser: (data: CreateUserDto) => Promise<AuthUserData>;

    getSession: (sessionId: SessionId) => Promise<RefreshToken | null>;
    createSession: (userId: UserId) => Promise<SessionId>;
    removeSession: (sessionId: SessionId) => Promise<void>;
    saveAuthTokens: (refresh: RefreshToken, sessionId: SessionId) => Promise<void>;

    clearSessions: () => Promise<void>;
}
