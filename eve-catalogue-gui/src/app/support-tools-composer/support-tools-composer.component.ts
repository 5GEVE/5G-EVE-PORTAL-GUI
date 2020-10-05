import { of } from 'rxjs';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NsdsService } from '../nsds.service';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { AuthService} from '../auth.service';


@Component({
  selector: 'app-support-tools-composer',
  templateUrl: './support-tools-composer.component.html',
  styleUrls: ['./support-tools-composer.component.css']
})
export class SupportToolsComposerComponent implements OnInit {

  vsbObj: Object;
  bObj: Object;
  vnsdObj:Object;
  ctxObj: Object;
  ctxnObj: Object;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isLinear = true;


  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    private nsdsService: NsdsService,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsEcService: BlueprintsEcService,
    private authService: AuthService
        
    ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });   
  }


  onUploadedVsb(event: any, vsbs: File[]) {
    let promises = [];

    for (let vsb of vsbs) {
      if(vsb.type=='application/json' && vsb.name.includes('json')){

        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
      (<HTMLInputElement> document.getElementById("firstNext")).disabled = true;  

    }
  }
  if(promises.length > 0){
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
  }
  onUploadedVsbNsd(event: any, vnsds: File[]) {
    let promises = [];

    for (let vnsd of vnsds) {
      if(vnsd.type=='application/json' && vnsd.name.includes('json')){
        let vnsdPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vnsd);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vnsdPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
      (<HTMLInputElement> document.getElementById("secondNext")).disabled = true;  

    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.vnsdObj = JSON.parse(fileContents[0]);
        this.nsdsService.validateNsDescriptor(this.vnsdObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("secondNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("secondNext")).disabled = false;  

          }
        });
        
      });
    }
  }
  onUploadedCtx(event: any, ctxs: File[]) {
    let promises = [];

    for (let ctx of ctxs) {
      if(ctx.type=='application/json' && ctx.name.includes('json')){

        let ctxPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(ctx);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(ctxPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
      (<HTMLInputElement> document.getElementById("thirdNext")).disabled = true;  

    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.ctxObj = JSON.parse(fileContents[0]);
        
        this.blueprintsEcService.validateCtxBlueprint(this.ctxObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("thirdNext")).disabled = true;  
          }else{
            (<HTMLInputElement> document.getElementById("thirdNext")).disabled = false;  

          }
        });
        
           
      });
    }
  }
  onUploadedCtxNsd(event: any, ctxns: File[]) {
    let promises = [];

    for (let ctxn of ctxns) {
      if(ctxn.type=='application/json' && ctxn.name.includes('json')){

        let ctxnPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(ctxn);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(ctxnPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
      (<HTMLInputElement> document.getElementById("download")).disabled = true;  

    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.ctxnObj = JSON.parse(fileContents[0]);
        
        this.nsdsService.validateNsDescriptor(this.ctxnObj)
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

  dynamicDownloadJson() {
    this.nsdsService.composeNsDescriptor(this.bObj)
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'compose_nsd.json',
        text: JSON.stringify(res)
      });     
    });  
  }
  
  createComposedNsd(){
    var onBoardComNsdRequest = JSON.parse('{}');
    var onBoardctxbRequest = JSON.parse('{}');
    var onBoardTrRequest = JSON.parse('{}');

    onBoardComNsdRequest['vsbRequest']= JSON.parse('{}');
    onBoardComNsdRequest['vsbRequest']['nsds']=[];
    onBoardComNsdRequest['vsbRequest']['nsds'].push(this.vnsdObj);
    onBoardComNsdRequest['vsbRequest']['translationRules'] =[];

    onBoardTrRequest['input']=[{"parameterId": "string","minValue": 0,"maxValue": 0}];
    onBoardTrRequest['blueprintId']="";
    onBoardTrRequest['nstId']="";
    onBoardTrRequest['nsdId']="";
    onBoardTrRequest['nsdVersion']="";
    onBoardTrRequest['nsFlavourId'] ="";
    onBoardTrRequest['nsInstantiationLevelId']="";
    //onBoardTrRequest['default']=true;

    onBoardComNsdRequest['vsbRequest']['translationRules'].push(onBoardTrRequest);
    onBoardComNsdRequest['vsbRequest']['vsBlueprint'] =this.vsbObj;
    onBoardComNsdRequest['contexts']=[];
    
    onBoardctxbRequest['ctxbRequest']= JSON.parse('{}');
    onBoardctxbRequest['ctxbRequest']['nsds']=[];
    onBoardctxbRequest['ctxbRequest']['nsds'].push(this.ctxnObj);
    onBoardctxbRequest['connectInput']= JSON.parse('{}');
    onBoardctxbRequest['connectInput']['additionalProp1'] ="";
    onBoardctxbRequest['connectInput']['additionalProp2'] ="";
    onBoardctxbRequest['connectInput']['additionalProp3'] ="";
    onBoardComNsdRequest['contexts'].push(onBoardctxbRequest);
    onBoardctxbRequest['ctxbRequest']['translationRules'] =[];
    onBoardctxbRequest['ctxbRequest']['translationRules'].push(onBoardTrRequest);
    onBoardctxbRequest['ctxbRequest']['ctxBlueprint']=this.ctxObj
    console.log(onBoardComNsdRequest)
    this.nsdsService.composeNsDescriptor(onBoardComNsdRequest)
    .subscribe(res => {
      if(res!==undefined){
        this.dyanmicDownloadByHtmlTag({
          fileName: 'compose_nsd.json',
          text: JSON.stringify(res)
        });      
       }     
    }); 
    
  }
}

