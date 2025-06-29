import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors({origin: 'http://localhost:4200',})
  // // app.use(bodyParser.json())
  // await app.listen(3000);

  app.enableCors({
    origin: [
      'http://localhost:4200', // Local Angular
      'https://api.care-connect.com', // Main App
      'https://care-connect-admin.com', // Admin Panel
    ],
    credentials: true, // if using cookies or authorization headers
  });
  // app.useStaticAssets(join(__dirname, '..', 'uploads'));
  // Serve static files from the 'uploads' directory
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/', // This allows accessing images via '/uploads/<filename>'
  });

  app.useGlobalGuards(
    new (class {
      canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const url = request.url;

        // Allow public access to static files served from the '/uploads/' path
        if (url.startsWith('/uploads/') || url.startsWith('/upload-images/')) {
          return true; // Skip authentication for static files
        }

        // Authentication check for other routes (replace with actual logic)
        // e.g., JWT, Session authentication, etc.
        return true;
      }
    })(),
  );

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

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
