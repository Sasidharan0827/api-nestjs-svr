import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors({origin: 'http://localhost:4200',})
  // // app.use(bodyParser.json())
  // await app.listen(3000);

  app.enableCors({ origin: 'http://localhost:4200' });
  // app.useStaticAssets(join(__dirname, '..', 'uploads'));

  // Setup Swagger
   const config = new DocumentBuilder()
  .setTitle('Care Connect')
  .setDescription('The Care Connect API description')
  .setVersion('1.0')
  .addTag('Care Connect')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  // Start the application
  await app.listen(3000);
}
bootstrap();
