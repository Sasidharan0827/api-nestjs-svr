import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UploadImagesService } from './upload-images.service';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.gaurd.';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('upload-images')
export class UploadImagesController {
  constructor(private readonly uploadImagesService: UploadImagesService) {}
  @Public()
  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',  
        filename: (req, file, cb) => {
          // const uniqueSuffix = Date.now() + extname(file.originalname);  
          // cb(null, uniqueSuffix);
          const id = req.params.id;  // Get 'id' from the route parameter
          const fileExt = extname(file.originalname);  // Extract the file extension
          const fileName = `${id}${fileExt}`;  // Set filename as 'id.extension'
          cb(null, fileName);  // Use 'id' as the file name
        },
      }),
    }),
  )
  uploadFile(@Param('id') id: string,@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Image uploaded successfully!',
    filename: file.filename,  
    imageUrl: `${process.env.BASE_URL}/uploads/${file.filename}`,
    
    };
  }


  // @Get()
// async findAll() {
//   const images = await this.uploadImagesService.findAll();
//   return images.map(image => ({
//     ...image,
//     imageUrl: `${process.env.BASE_URL}/uploads/${image.imagepath}`,
//   }));
// }
   @Public()
  @Get()
  findAll() {
    return this.uploadImagesService.findAll();
  }


  @Get(':filename')
  @Public() // This decorator allows public access without authentication
  async findOne(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.uploadImagesService.findOne(filename);
    
    try {
      // Send the specific image file
      return res.sendFile(filePath);
    } catch (error) {
      // Handle the error, e.g., file not found
      return res.status(404).json({
        message: 'File not found',
        statusCode: 404,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadImageDto: UpdateUploadImageDto) {
    return this.uploadImagesService.update(+id, updateUploadImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadImagesService.remove(+id);
  }
}
