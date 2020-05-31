import { Subscription } from 'rxjs';

export class FileUploadModel {
    data: File;
    filename: string;
    sites: Array<string>;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
  }

  export class FileModel {
    filename: string;
    assotiatedSite: string;
    status: string;
    creator: string;
  }