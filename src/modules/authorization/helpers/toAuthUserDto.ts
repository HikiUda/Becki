import {
    AuthUserData,
    AuthUserDto,
    SessionId,
    UserId,
    AuthUserDtoValidateToken,
} from '../dto/user.dto';

export function toAuthUserDto(
    user: AuthUserData | AuthUserDtoValidateToken,
    sessionId: SessionId,
): AuthUserDto {
    return {
        sessionId,
        id: user.id as UserId,
        login: user.login,
        name: user.name,
    };
}
