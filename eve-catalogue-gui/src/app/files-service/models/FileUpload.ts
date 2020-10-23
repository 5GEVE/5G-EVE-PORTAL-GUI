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
    creator: string;
    created_at: string;
    updated_at: string;
  }

  export class DeploymentRequestModel {
    request_id: string;
    filename: string;
    creator: string;
    site: string;
    status: string;
  }  