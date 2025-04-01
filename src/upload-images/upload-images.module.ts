import { Module } from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { UploadImagesController } from './upload-images.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads/', 
    }),
  ],
  controllers: [UploadImagesController],
  providers: [UploadImagesService],
})
export class UploadImagesModule {}
