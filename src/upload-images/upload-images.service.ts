import { Injectable } from '@nestjs/common';
import { CreateUploadImageDto } from './dto/create-upload-image.dto';
import { readdirSync } from 'fs';
import { join } from 'path';
import { UpdateUploadImageDto } from './dto/update-upload-image.dto';

@Injectable()
export class UploadImagesService {
  create(createUploadImageDto: CreateUploadImageDto) {
    return 'This action adds a new uploadImage';
  }

  private readonly uploadPath = join(process.cwd(), 'uploads');


  findAll(): string[] {
    // Read all filenames in the uploads directory
// return readdirSync(this.uploadPath).map((filename) => `http://localhost:3000/uploads/${filename}`);
return readdirSync(this.uploadPath).map((filename) => {
  return `http://localhost:3000/upload-images/${filename}`;
});
}

findOne(filename: string): string {
  const filePath = join(this.uploadPath, filename);
  return filePath; // Return the file path or modify to suit your needs
}
  update(id: number, updateUploadImageDto: UpdateUploadImageDto) {
    return `This action updates a #${id} uploadImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadImage`;
  }
  
}
