import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import * as fileSaver from 'file-saver';

import { FileModel, FileUploadModel, DeploymentRequestModel } from "./models/FileUpload"
import { FilesService } from './services/files.service';
import { FileServiceDialogComponent } from './file-service-dialog/file-service-dialog.component';
import { FileUploadDialogComponent } from "./file-upload-dialog/file-upload-dialog.component"
import { MatDialog } from '@angular/material/dialog';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { FileDpRequestDialogComponent } from './file-dp-request-dialog/file-dp-request-dialog.component'

@Component({
  selector: 'app-files-service',
  templateUrl: './files-service.component.html',
  styleUrls: ['./files-service.component.css'],
})

export class FilesServiceComponent implements OnInit {

  status: string = 'add';
  refreshed: boolean = false;
  fetching: boolean = true;

  fetchedFiles = [];
  fetchedRequests = [];
  siteFacilities = [];

  MAX_FILE_SIZE_GB = 50;

  displayedColumns: string[] = ['filename', 'owner', 'updated_at', 'actions'];
  requestsColumns: string[];

  uploadForm: FormGroup;
  selectedSites: string[] = [];
  checkArray: FormArray;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = []; 

  downloadProgress: number = 0;
  showMatProgress: boolean = false;

  constructor(private _http: HttpClient,
    private filesService: FilesService,
    private router: Router,
    private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {

    if (localStorage.getItem('logged') != "true") {
      this.router.navigate(['/login']);
    }

    this.uploadForm = this.formBuilder.group({
      filename: ['', Validators.required],
      selectedSiteFacilities   : this.formBuilder.array([])
    });
    if (this.isSiteManager()){
      this.goTo('dp_requests')
    }
    else{
      this.fetchedFiles = [];
      this.getUploadedFiles();
      this.setStatus('list');
      if (!this.siteFacilities.length){
        this.getSiteFacilities();
      }
    }

    this.selectedSites = [];
    this.files = [];
  }

  getStatus(){
    return this.status;
  }
  setStatus(status){
    this.status = status;
  }

  get f() { return this.uploadForm.controls; }

  getColumns(){
    if (this.isVnfDev()){
      this.requestsColumns = ['request_id','filename', 'site', 'status', 'actions'];
    }
    else{
      this.requestsColumns =['request_id', 'owner', 'site', 'status', 'actions'];
    }
  }

  isSiteManager(){
    let roles = localStorage.getItem('roles');
    if (roles.indexOf("SiteManager") >= 0) {
      return true;
    }
    else{
      return false;
    }
  }

  isVnfDev(){
    let roles = localStorage.getItem('roles');
    if (roles.indexOf("VnfDeveloper") >= 0) {
      return true;
    }
    else{
      return false;
    }    
  }

  goTo(route: string){
    switch (route){
      case 'list':
        this.cleanUploadForm();
        this.ngOnInit();
        this.setStatus('list');
        break;
      case 'add': 
        this.getSiteFacilities();
        this.setStatus('add');
        break;
      case 'dp_requests':
        this.fetchedRequests = new Array();
        this.getDeploymentRequests();
        this.getColumns();
        this.setStatus('dp_requests');
    }   
  }

  getSiteFacilities(){
    this.fetching = true;
    this.filesService.fetchSiteFacilities()
    .pipe()
    .subscribe(
      data => {
        this.siteFacilities = data['details']['site_facilities'];
        this.fetching = false;
      },
      error => {
          if ((error[0] == 401) && (!this.refreshed)) {
            this.refreshErrorHandler('getSiteFacilities');
          }
          else{
            this.fetching = false;
            this.router.navigate(['/login']);           
          }
    });
  }

  getUploadedFiles(){
    this.fetching = true;
    this.filesService.fetchUploadedFiles()
    .pipe()
    .subscribe(
        data => {
          for (let index = 0; index < data['files'].length; index++){
            let newFile = new FileModel();
            newFile.filename = data['files'][index]['filename'];
            newFile.creator = data['files'][index]['creator'];
            newFile.created_at = data['files'][index]['created_at'];
            let update_at_split = data['files'][index]['updated_at'].split(" ");
            newFile.updated_at = update_at_split[1] + "," + update_at_split[2] + "," + update_at_split[3];
            this.fetchedFiles.push(newFile);
          }
          this.fetching = false;
        },
        error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              this.refreshErrorHandler('getUploadedFiles');
            }
            else{
              this.fetching = false;
              this.router.navigate(['/login']);           
            }
      });
  }

  getDeploymentRequests(){
    this.fetching = true;
    this.filesService.fetchDeploymentRequests()
    .pipe()
    .subscribe(
        data => {
          Object.keys(data).forEach(function(key) {
            for (let index = 0; index < data[key].length; index++){
              let newRequest = new DeploymentRequestModel();
              newRequest.request_id = data[key][index]['request_id'];
              newRequest.filename = data[key][index]['filename'];
              newRequest.creator = data[key][index]['creator']
              //let siteNameArray = data[key][index]['site'].split("_")
              //newRequest.site = siteNameArray[0].substring(0,2) + "_" + siteNameArray[1]
              newRequest.site = data[key][index]['site']
              newRequest.status = data[key][index]['status']
              this.fetchedRequests.push(newRequest);
            }
          }.bind(this));
          this.fetching = false;
        },
        error => {
            if ((error[0] == 401) && (!this.refreshed)) {
              this.refreshErrorHandler('getUploadedFiles');
            }
            else{
              this.fetching = false;
              this.router.navigate(['/login']);           
            }
      });
  }

  fileDetails(filename: String){
    console.log(filename);
  }

  onSubmit() {
    this.uploadFiles(this.f.filename.value, this.selectedSites);
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++){  
        const file = fileUpload.files[index];  
        var extension =file.name.split(".").pop();
        var fileSizeGb = file.size / 1000000;

        if (extension != "zip"){
          this.fileNotSupportedDialog("Format not supported (Only ZIP allowed)");
        }
        else if (fileSizeGb > this.MAX_FILE_SIZE_GB){
          this.fileNotSupportedDialog("File size exceeded (limited to 50GB)");
        }
        else{
          this.files.push({ data: file, filename: file.name, inProgress: false, progress: 0});  
        }
      }  
    };  
    fileUpload.click();  
}

fileNotSupportedDialog(error: string) {

  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    width: '60%',
    data: {problem: error}
  });

  dialogRef.afterClosed().subscribe();
}

deleteFromUploadList(filename){
  const fileUpload = this.fileUpload.nativeElement;
  for (let index = 0; index < fileUpload.files.length; index++){    
    this.files.filter(f =>{
      if (f.filename == filename){
        this.files.splice(index, 1);
      }
    })
  }  
}


private uploadFiles(filename, sites: string[]) {  
  this.fileUpload.nativeElement.value = '';  

  this.files.forEach(file => {  
    this.uploadFile(file, filename, sites);  
  });  

}


uploadFile(file, filename: string, sites: string[]) {  
  const formData = new FormData();  
  formData.append('file', file.data);  
  file.inProgress = true;  
  filename = filename.split(" ").join("_");
  filename = filename + ".zip";

  this.filesService.check_file(filename).pipe()
  .subscribe((event: any) => { 
    if (event instanceof HttpResponse){
      let data = JSON.parse(JSON.stringify(event.body))
      if ((event.status == 200) && (Object.keys(data['details']).length != 0)){
        this.filenameAlreadyInUseDialog("File name already exists");
        this.cleanUploadForm();
      }
      else if ((event.status == 200) && (Object.keys(data['details']).length == 0)){
        this.filesService.upload(formData, filename)
        .pipe(  
          map(event => {
            switch (event.type) {  
              case HttpEventType.UploadProgress:  
                file.progress = Math.round(event.loaded * 100 / event.total);  
                break;  
              case HttpEventType.Response: 
                return event;  
            } 
          }),  
          catchError((error: HttpErrorResponse) => { 
            file.inProgress = false;  
            return of(`${file.data.name} upload failed.`);
        }))
        .subscribe((event: any) => {
          if (typeof (event) === 'object') {  
            this.filesService.setSites(filename, sites)
            .pipe()
            .subscribe(
              data => {
                this.ngOnInit();
              },
              error => {
                //TODO: show error when requests were not creted
                this.router.navigate(['/login']);
            });
          }  
        });
      }
      else{
        console.log(event);
      }
    }
  });  
}

cleanUploadForm(){
  this.uploadForm.reset();
  this.files = [];
  //TODO: clean checkboxes
}

filenameAlreadyInUseDialog(error: string) {

  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    width: '60%',
    data: {problem: error}
  });

  dialogRef.afterClosed().subscribe();
}

downloadFile(filename: string){
  this.filesService.downloadFile(filename)
  .pipe(  
    map(event => {  
      switch (event.type) {  
        case HttpEventType.DownloadProgress:  
          this.downloadProgress = Math.round(100 * event.loaded / event.total);

          break;  
        case HttpEventType.Response: 
          fileSaver.saveAs(event.body, filename);
          this.downloadProgress = 0;
          this.showMatProgress = false;
  
          return event;  
      } 
    }),  
    catchError((error: HttpErrorResponse) => {  
      return of('Download failed.');
    })).subscribe((event: any) => {
      if (typeof (event) === 'object') {  
      }  
    }); 
}

downloadAssociatedFile(filename: string, request_id: string){
  this.filesService.downloadAssociatedFile(request_id)
  .pipe(  
    map(event => {  
      switch (event.type) {  
        case HttpEventType.DownloadProgress:  
          this.downloadProgress = Math.round(100 * event.loaded / event.total);

          break;  
        case HttpEventType.Response: 
          fileSaver.saveAs(event.body, filename);
          this.downloadProgress = 0;
          this.showMatProgress = false;
  
          return event;  
      } 
    }),  
    catchError((error: HttpErrorResponse) => {  
      return of('Download failed.');
    })).subscribe((event: any) => {
      if (typeof (event) === 'object') {  
      }  
    }); 
}

deleteFile(filename: string){
  this.filesService.deleteFile(filename)
  .pipe()
  .subscribe(
      data => {
        this.ngOnInit();
      },
      error => {
          if ((error[0] == 401) && (!this.refreshed)) {
            this.refreshErrorHandler('deleteFile');
          }
          else{
            this.router.navigate(['/login']);           
          }
    });
}

deleteRequest(requestId: string){
  this.filesService.deleteRequest(requestId)
  .pipe()
  .subscribe(
      data => {
        this.goTo("dp_requests");
      },
      error => {
        this.router.navigate(['/login']);
    });
}

deleteDialog(filename: string) {

  const dialogRm = this.dialog.open(FileDialogComponent, {
    width: '60%',
    data: {filename: filename, action: "delete"},
  });

  dialogRm.afterClosed().subscribe((result) => {
    if (result){
      this.deleteFile(filename);
    }
  });
}

deleteRequestDialog(requestId: string, filename: string, sitename: string) {
  let text = "Deployment Request on " + filename + " - " + sitename;
  const dialogRm = this.dialog.open(FileDialogComponent, {
    width: '60%',
    data: {filename: text, action: "delete"},
  });

  dialogRm.afterClosed().subscribe((result) => {
    if (result){
      this.deleteRequest(requestId);
    }
  });
}

downloadDialog(filename: string) {

  const dialogDl = this.dialog.open(FileDialogComponent, {
    width: '60%',
    data: {filename: filename, action: "download"},
  });

  dialogDl.afterClosed().subscribe((result) => {
    if (result){
      this.showMatProgress = result;

      this.downloadFile(filename);
    }
  });
}

downloadAssociatedDialog(filename:string, request_id: string) {

  const dialogDl = this.dialog.open(FileDialogComponent, {
    width: '60%',
    data: {filename: filename, action: "download"},
  });

  dialogDl.afterClosed().subscribe((result) => {
    if (result){
      this.showMatProgress = result;
      this.downloadAssociatedFile(filename, request_id);
    }
  });
}

createRequestDialog(filename: string, owner: string){
  const dialogCreateRequest = this.dialog.open(FileDpRequestDialogComponent, {
    width: '60%',
    data: {filename: filename, owner: owner, siteFacilities: this.siteFacilities},
  });

  dialogCreateRequest.afterClosed().subscribe((result) => {
    if (result === "CREATED"){
      this.goTo('dp_requests')
    }
  });

}

fileStatusDialog(requestId: string, filename: string, site: string, action: string) {

  const dialogRef = this.dialog.open(FileServiceDialogComponent, {
    width: '60%',
    data: {filename: filename, site: site}
  });

  dialogRef.afterClosed().subscribe(selectedStatus => {
    if (selectedStatus) {
      if (action == "edit"){
        this.filesService.setStatus(requestId, selectedStatus)
        .pipe()
        .subscribe(
          data => {
            this.goTo(this.getStatus())
          },
          error => {
            this.router.navigate(['/login']);
        });
      }
    }
  });
}

onCheckboxChange(e) {
  this.checkArray = this.uploadForm.get('selectedSiteFacilities') as FormArray;
  
  if (e.target.checked) {
    this.checkArray.push(new FormControl(e.target.value));
    this.selectedSites.push(e.target.value);
  } else {
    let i: number = 0;
    this.checkArray.controls.forEach((item: FormControl) => {
      if (item.value == e.target.value) {
        this.checkArray.removeAt(i);
        this.selectedSites = this.selectedSites.filter(r => r !== e.target.value);
        return;
      }
      i++;
    });
  }
}

  refreshErrorHandler(funcName: string){
    this.authenticationService.refresh({
      access_token: localStorage.getItem('token'),
      refresh_token: localStorage.getItem('refreshtoken')
    })
    .pipe()
      .subscribe(
        data => {
          this.refreshed = true;
          switch (funcName){
            case 'getUploadedFiles':
              this.getUploadedFiles();
              break;
            case 'getSiteFacilities':
                this.getSiteFacilities();
                break;
          }
        },
        error => {
          this.refreshed = false;
          this.router.navigate(['/login']);                    
        }
      )    
  }
}
