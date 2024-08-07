import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
   readonly uploadPath = join(__dirname, '..', 'MY-FILES');

  constructor() {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath);
    }
  }

  saveFile(file: Express.Multer.File): string {
    const filePath = join(this.uploadPath, file.originalname);
    writeFileSync(filePath, file.buffer);
    return filePath;
  }


  getUploadedFiles(): string[] {
    return readdirSync(this.uploadPath);
  }
}
