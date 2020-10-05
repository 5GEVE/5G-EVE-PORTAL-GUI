import { of } from 'rxjs';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NsdsService } from '../nsds.service';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-support-tools-nsd',
  templateUrl: './support-tools-nsd.component.html',
  styleUrls: ['./support-tools-nsd.component.css']
})
export class SupportToolsNsdComponent implements OnInit {

  bObj: Object;
  firstFormGroup: FormGroup;


  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    private nsdsService: NsdsService,
    private authService: AuthService
    
    ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
   
  }




  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }


  fakeValidateUserData() {
    return of({
      userDate1: 1,
      userData2: 2
    });
  }



  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  onUploadedBlueprint(event: any, blueprints: File[]) {

    let promises = [];

    for (let blu of blueprints) {
      if(blu.type=='application/json' && blu.name.includes('json')){

        let bPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(blu);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(bPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
      (<HTMLInputElement> document.getElementById("download")).disabled = true;  

    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.bObj = JSON.parse(fileContents[0]);
        this.nsdsService.generateNsDescriptor(this.bObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("download")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("download")).disabled = false;  

          }    
        });  
      });
  }
}

  dynamicDownloadJson() {
    this.nsdsService.generateNsDescriptor(this.bObj)
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'nsd.json',
        text: JSON.stringify(res)
      });     
    });  
  }
  
}

