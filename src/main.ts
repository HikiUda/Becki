import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { setupSwagger } from './shared/config/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //TODO cors
    app.enableCors({
        credentials: true,
        //origin: 'http://localhost:3000',
        origin: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ZodValidationPipe());
    setupSwagger(app);
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
