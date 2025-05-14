import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //TODO cors
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:3000',
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ZodValidationPipe());
    const config = new DocumentBuilder()
        .setTitle('Becki here!')
        .setDescription('All my api for you!')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
