import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [AuthModule, CaslModule, ProfileModule],
    controllers: [],
    providers: [],
})
export class UserModule {}
