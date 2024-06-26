import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true
  }))

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('5tart-Travel')
    .setDescription('')
    .setVersion('0.6')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);



  await app.listen(3000);
  console.log('Server is running on 3000');
}
bootstrap();
