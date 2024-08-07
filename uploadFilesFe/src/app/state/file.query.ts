import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FileStore, FileState } from './file.store';
import { File } from './file.model';

@Injectable({ providedIn: 'root' })
export class FileQuery extends QueryEntity<FileState, File> {
  constructor(protected override store: FileStore) {
    super(store);
  }
}


