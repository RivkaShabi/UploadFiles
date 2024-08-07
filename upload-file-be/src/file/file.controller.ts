import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Multer } from 'multer';
import { Response } from 'express';
import * as path from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): { filePath: string } {
    const filePath = this.fileService.saveFile(file);
    return { filePath };
  }
  

  @Get('list')
  getUploadedFiles(): string[] {
    return this.fileService.getUploadedFiles();
  }
  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(this.fileService.uploadPath, filename);
    res.download(filePath);
  }
}
