import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //TODO cors
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:3001',
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
