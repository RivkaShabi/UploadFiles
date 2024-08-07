import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../state/file.service';
import { FileQuery } from '../state/file.query';
import { FileStore } from '../state/file.store';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  faUpload = faUpload;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  uploadedFiles$: Observable<{ name: string, url: string }[]>; 
  showMenu = false;
  message="";
  numberFile:number=0;
  constructor(private fileService:FileService, 
       private fileStore: FileStore,
    private fileQuery: FileQuery) {
    this.uploadedFiles$ = this.fileService.selectAll(); 
    this.loadFiles(); 
    this.uploadedFiles$.subscribe(files => { this.numberFile= files.length    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
  }

  uploadFile() {
    if (!this.selectedFile) {
      this.message="פעולת ההעלאת הקובץ נכשלה";
      console.error('No file selected');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFileName!=''?this.selectedFileName+"."+this.selectedFile.name.split('.').pop() :this.selectedFile.name);

    this.fileService.uploadFile(formData).subscribe(response => {
      console.log('File uploaded to:', response.filePath);
      this.loadFiles(); 
      this.message="הקובץ הועלה בהצלחה";
    }, error => {
      this.message="פעולת ההעלאת הקובץ נכשלה";
      console.error('Error uploading file', error);
    });
  }

  loadFiles() {
    this.fileService.listFiles().subscribe(files => {
      const formattedFiles = files.map(file => ({
        name: file,
        url: `/api/file/download/${file}`
      }));
    }, error => {
      console.error('Error loading files', error);
    });
  }

  toggleMenu(event: Event) {
    if(this.numberFile==0){
      return;
    }
    this.showMenu = !this.showMenu;
    event.stopPropagation();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    const contextMenu = document.querySelector('.context-menu');
    if (contextMenu && !contextMenu.contains(event.target as Node)) {
      this.showMenu = false;
    }
  }
}
