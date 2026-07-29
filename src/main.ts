import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://meal.nguyenkhoi.io.vn',
    ],
  });
  console.log(process.env.PORT);
  console.log(process.env.DATABASE_URL);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
