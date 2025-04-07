import { AuthDataUser, AuthUserDto, ValidateTokenReturnType } from '../types/user';

export function toAuthUserDto(
    user: AuthDataUser | ValidateTokenReturnType,
    sessionId: number,
): AuthUserDto {
    return {
        sub: sessionId,
        id: user.id,
        login: user.login,
        name: user.name,
    };
}
