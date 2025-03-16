import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    transform:true,
    forbidNonWhitelisted:true, // can be helpful in development process to update the DTO's if you'rent fully into functionality
    transformOptions:{
      enableImplicitConversion: true
    }
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
