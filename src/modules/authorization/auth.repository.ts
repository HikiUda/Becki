import { Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from './interfaces/authRepository';
import { AuthUserData, RefreshToken, SessionId, UserId } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    constructor(private prisma: PrismaService) {}

    async createUser(dto: CreateUserDto): Promise<AuthUserData> {
        return await this.prisma.user.create({
            data: { ...dto, name: dto.login },
            select: { id: true, name: true, login: true, password: true },
        });
    }

    async getAuthUser(login: string): Promise<AuthUserData | null> {
        return await this.prisma.user.findUnique({
            where: { login },
            select: { id: true, name: true, login: true, password: true },
        });
    }

    async getSession(sessionId: SessionId): Promise<RefreshToken | null> {
        const session = await this.prisma.userSessions.findUnique({
            where: { id: sessionId },
            select: { refresh: true },
        });
        return session && (session.refresh as RefreshToken);
    }

    async createSession(userId: UserId): Promise<SessionId> {
        const session = await this.prisma.userSessions.create({
            data: { userId },
            select: { id: true },
        });
        return session.id as SessionId;
    }

    async removeSession(sessionId: SessionId): Promise<void> {
        await this.prisma.userSessions.delete({
            where: { id: sessionId },
        });
        return;
    }

    async saveAuthTokens(refresh: RefreshToken, sessionId: SessionId): Promise<void> {
        await this.prisma.userSessions.update({
            where: { id: sessionId },
            data: { refresh },
        });
        return;
    }

    async clearSessions(): Promise<void> {
        const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        await this.prisma.userSessions.deleteMany({ where: { updatedAt: { lt: date } } });
        return;
    }
}
