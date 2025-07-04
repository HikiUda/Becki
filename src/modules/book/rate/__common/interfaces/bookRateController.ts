import { AuthUserRequest } from 'src/modules/user/auth';
import { BookIdParam } from 'src/modules/book/_common/model/bookId';
import { UserBookRate } from '../dto/userBookRate.dto';
import { SetUserBookRateDto } from '../dto/setUserBookRate.dto';

export interface BookRateControllerInterface {
    getRate: (req: AuthUserRequest, params: BookIdParam) => Promise<UserBookRate>;
    setRate: (req: AuthUserRequest, params: BookIdParam, body: SetUserBookRateDto) => Promise<void>;
    deleteRate: (req: AuthUserRequest, params: BookIdParam) => Promise<void>;
}
