import { Injectable } from '@angular/core';
import { FileStore } from './file.store';
import { FileQuery } from './file.query';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { File } from './file.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private fileStore: FileStore, private fileQuery: FileQuery, private http: HttpClient) {}
  selectAll(): Observable<{ name: string, url: string }[]> {
    
    return this.fileQuery.selectAll();
  }
  listFiles() {
    return this.http.get<string[]>('/api/file/list').pipe(
      tap(files => {
        const fileEntities = files.map(fileName => ({
          id: fileName,
          name: fileName,
          url: `/api/file/download/${fileName}`
        }));
        this.fileStore.set(fileEntities);
      })
    );
  }

  uploadFile(formData: FormData) {
    return this.http.post<{ filePath: string }>('/api/file/upload', formData).pipe(
      tap(response => {
        const file = {
          id: response.filePath,
          name: response.filePath,
          url: `/api/file/download/${response.filePath}`
        };
        this.fileStore.add(file);
      })
    );
  }
}
