import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT: number = 3001;

async function bootstrap() {
  console.log(`Server running at PORT:${PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
