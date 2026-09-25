import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true, // Requerido para el webhook de Stripe[cite: 1]
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //[cite: 1]
      forbidNonWhitelisted: true, // Config fail-fast[cite: 1]
    })
  );

  const port = process.env.PORT || 3003; // Puerto sugerido[cite: 1]
  await app.listen(port);
  console.log(`API corriendo en el puerto: ${port}`);
}
bootstrap();
