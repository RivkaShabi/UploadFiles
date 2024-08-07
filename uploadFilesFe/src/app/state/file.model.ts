export interface File {
    id: string;
    name: string;
    url: string;
  }
  
  export function createFile(params: Partial<File>) {
    return {
      id: params.id || '',
      name: params.name || '',
      url: params.url || ''
    } as File;
  }
  