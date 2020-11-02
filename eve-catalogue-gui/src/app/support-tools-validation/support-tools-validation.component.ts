import { of } from 'rxjs';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { NsdsService } from '../nsds.service';
import { AuthService} from '../auth.service';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { BlueprintsTcService} from '../blueprints-tc.service';

@Component({
  selector: 'app-support-tools-validation',
  templateUrl: './support-tools-validation.component.html',
  styleUrls: ['./support-tools-validation.component.css']
})
export class SupportToolsValidationComponent implements OnInit {

  selectedTool: string;
  firstFormGroup: FormGroup;
  vsbObj:object;
  ctxObj:object;
  expObj:object;
  tcbObj:object;
  nsdObj:object;
  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    private nsdsService: NsdsService,
    private authService: AuthService,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsEcService: BlueprintsEcService,
    private blueprintsExpService: BlueprintsExpService,
    private blueprintsTcService: BlueprintsTcService,

    

    
    ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      uploadF: ['', Validators.required],
      tools: ['', Validators.required]
    });
   
  }

  onChangetools(event:any) {
    this.selectedTool=event.value;
  }

  onUploadedTool(toolfiles:File[]){

    if(this.selectedTool=="vsb"){
      let promises = [];

      for (let vsb of toolfiles) {
        if(vsb.type=='application/json' && vsb.name.includes('json')){

          let vsbPromise = new Promise(resolve => {
              let reader = new FileReader();
              reader.readAsText(vsb);
              reader.onload = () => resolve(reader.result);
          });
          promises.push(vsbPromise);
      }else{
        this.authService.log(`the file is not json`, 'FAILED', false);
      }
    }
    if(promises.length > 0){
      Promise.all(promises).then(fileContents => {
          this.vsbObj = JSON.parse(fileContents[0]);
          
          this.blueprintsVsService.validateVsBlueprint(this.vsbObj)
          .subscribe(res => {
            if(res===undefined){
              this.authService.handleValidatorError<String>('validateVsBlueprint')
            }else{
              this.authService.log(`validation`, 'SUCCESS', true)
            }
          });
            
        });
      }
  }

   if(this.selectedTool=="ctx")
   {
    let promises = [];

    for (let ctx of toolfiles) {
      if(ctx.type=='application/json' && ctx.name.includes('json')){

        let ctxPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(ctx);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(ctxPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.ctxObj = JSON.parse(fileContents[0]);
        
        this.blueprintsEcService.validateCtxBlueprint(this.ctxObj)
        .subscribe(res => {
          if(res===undefined){
            this.authService.handleValidatorError<String>('validateCtxBlueprint')
          }else{
            this.authService.log(`validation`, 'SUCCESS', true)
          }
        });
        
           
      });
    }

  }

  if(this.selectedTool=="tcb")
  {
    let promises = [];

    for (let tcb of toolfiles) {
      if(tcb.type=='application/json' && tcb.name.includes('json')){

        let tcbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(tcb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(tcbPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.tcbObj = JSON.parse(fileContents[0]);
        
        this.blueprintsTcService.validateTcBlueprint(this.tcbObj)
        .subscribe(res => {
          if(res===undefined){
            this.authService.handleValidatorError<String>('validateExpBlueprint')
          }else{
            this.authService.log(`validation`, 'SUCCESS', true)
          }
        });
        
           
      });
    }
  }

  if(this.selectedTool=="exp")
  {
    let promises = [];

    for (let exp of toolfiles) {
      if(exp.type=='application/json' && exp.name.includes('json')){

        let expPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(exp);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(expPromise);
    }else{
      this.authService.log(`the file is not json`, 'FAILED', false);
    }
  }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.expObj = JSON.parse(fileContents[0]);
        this.blueprintsExpService.validateExpBlueprint(this.expObj)
        .subscribe(res => {
          if(res===undefined){
            this.authService.handleValidatorError<String>('validateExpBlueprint')
          }else{
            this.authService.log(`validation`, 'SUCCESS', true)
          }
        });
        
           
      });
    }
  }

if(this.selectedTool=="nsd"){
  let promises = [];

  for (let nsd of toolfiles) {
    if(nsd.type=='application/json' && nsd.name.includes('json')){

      let nsdPromise = new Promise(resolve => {
          let reader = new FileReader();
          reader.readAsText(nsd);
          reader.onload = () => resolve(reader.result);
      });
      promises.push(nsdPromise);
  }else{
    this.authService.log(`the file is not json`, 'FAILED', false);
  }
}
if(promises.length > 0){
  Promise.all(promises).then(fileContents => {
      this.nsdObj = JSON.parse(fileContents[0]);
      
      this.nsdsService.validateNsDescriptor(this.nsdObj)
      .subscribe(res => {
        if(res===undefined){
          this.authService.handleValidatorError<String>('validateNsDescriptor')
        }else{
          this.authService.log(`validation`, 'SUCCESS', true)
        }
      });
      
      
         
    });
  }
}



  }


  
}

