import { of } from 'rxjs';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NsdsService } from '../nsds.service';
import { BlueprintsVsService } from '../blueprints-vs.service';

@Component({
  selector: 'app-support-tools-composer',
  templateUrl: './support-tools-composer.component.html',
  styleUrls: ['./support-tools-composer.component.css']
})
export class SupportToolsComposerComponent implements OnInit {

  vsbObj: Object;
  bObj: Object;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isLinear = true;


  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    private nsdsService: NsdsService,
    private blueprintsVsService: BlueprintsVsService    
    ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });   
  }


  onUploadedVsb(event: any, vsbs: File[]) {
    //(<HTMLInputElement> document.getElementById("firstNext")).disabled = false;          
    let promises = [];

    for (let vsb of vsbs) {
        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.vsbObj = JSON.parse(fileContents[0]);
        this.blueprintsVsService.validateVsBlueprint(this.vsbObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = false;  

          }
        });
           
      });
  }
  onUploadedVsbNsd(event: any, vsbs: File[]) {
    //(<HTMLInputElement> document.getElementById("firstNext")).disabled = false;          
    let promises = [];

    for (let vsb of vsbs) {
        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.vsbObj = JSON.parse(fileContents[0]);
        this.blueprintsVsService.validateVsBlueprint(this.vsbObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = false;  

          }
        });
           
      });
  }
  onUploadedCtx(event: any, vsbs: File[]) {
    //(<HTMLInputElement> document.getElementById("firstNext")).disabled = false;          
    let promises = [];

    for (let vsb of vsbs) {
        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.vsbObj = JSON.parse(fileContents[0]);
        this.blueprintsVsService.validateVsBlueprint(this.vsbObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = false;  

          }
        });
           
      });
  }
  onUploadedCtxNsd(event: any, vsbs: File[]) {
    //(<HTMLInputElement> document.getElementById("firstNext")).disabled = false;          
    let promises = [];

    for (let vsb of vsbs) {
        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.vsbObj = JSON.parse(fileContents[0]);
        this.blueprintsVsService.validateVsBlueprint(this.vsbObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("firstNext")).disabled = false;  

          }
        });
           
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
        let bPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(blu);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(bPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.bObj = JSON.parse(fileContents[0]);
        this.nsdsService.composeNsDescriptor(this.bObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("download")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("download")).disabled = false;  

          }    
        });  
      });
  }

  dynamicDownloadJson() {
    this.nsdsService.composeNsDescriptor(this.bObj)
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'compose_nsd.json',
        text: JSON.stringify(res)
      });     
    });  
  }
  
}

