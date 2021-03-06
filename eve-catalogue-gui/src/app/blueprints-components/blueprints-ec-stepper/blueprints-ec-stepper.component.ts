import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BlueprintsEcService } from '../../blueprints-ec.service';
import { BlueprintsEcComponent} from '../blueprints-ec/blueprints-ec.component';

@Component({
  selector: 'app-blueprints-ec-stepper',
  templateUrl: './blueprints-ec-stepper.component.html',
  styleUrls: ['./blueprints-ec-stepper.component.css']
})
export class BlueprintsEcStepperComponent implements OnInit {

  nsdObj: Object;

  ctxbObj: Object;

  dfs: String[] = [];

  instLevels: String[] = [];
  translationParams: String[] = [];

  formula = false;
  isLinear = false;
  isButtonVisible = false;
  items: FormArray;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(@Inject(DOCUMENT) document,
  private _formBuilder: FormBuilder,
  private blueprintsEcService: BlueprintsEcService,
  private blueprintEcComponent: BlueprintsEcComponent) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      nsdId: ['', Validators.required],
      nsdVersion: ['', Validators.required],
      nsFlavourId: ['', Validators.required],
      nsInstLevel: ['', Validators.required],
      items: this._formBuilder.array([])
    });
  }

  createItem(): FormGroup {
    return this._formBuilder.group({
      parameterId: '',
      minValue: '',
      maxValue: ''
    });
  }

  hideNextShowSubmit($event:any){
    var submit = document.getElementById("submitButton");
    var next = document.getElementById("nextButton");
    var uploadFile = document.getElementById("uploadFile");
    if ($event.source.checked){
      submit.style.display = 'inline';
      next.style.display = 'none';
      this.secondFormGroup.controls['secondCtrl'].disable();
    } else {
      next.style.display = 'inline';
      submit.style.display = 'none';
      this.secondFormGroup.controls['secondCtrl'].enable();
    }

  }



  onUploadedCtxb(event: any, ctxbs: File[]) {
    //console.log(event);

    let promises = [];

    for (let ctx of ctxbs) {
        let ctxbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(ctx);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(ctxbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.ctxbObj = JSON.parse(fileContents[0]);

        //console.log(JSON.stringify(this.ctxbObj, null, 4));
        if (this.ctxbObj['parameters'] !== undefined){
          for (var i = 0; i < this.ctxbObj['parameters'].length; i++){
            this.items = this.thirdFormGroup.get('items') as FormArray;
            this.items.push(this.createItem());
            this.translationParams.push(this.ctxbObj['parameters'][i]['parameterId']);
          }
        }
    });
  }

  onUploadedNsd(event: any, nsds: File[]) {
    //console.log(event);
    //this.uploadedNsdName = event.target.files[0].name;

    let promises = [];

    for (let nsd of nsds) {
        let nsdPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(nsd);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(nsdPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.nsdObj = JSON.parse(fileContents[0]);

        //console.log(JSON.stringify(this.nsdObj, null, 4));

        this.thirdFormGroup.get('nsdId').setValue(this.nsdObj['nsdIdentifier']);
        this.thirdFormGroup.get('nsdVersion').setValue(this.nsdObj['version']);

        this.dfs = this.nsdObj['nsDf'];

        //this.fourthFormGroup.get('nsFlavourIdCtrl').setValue(nsdObj['nsDf'][0]['nsDfId']);
        //this.fourthFormGroup.get('nsInstLevelIdCtrl').setValue(nsdObj['nsDf'][0]['nsInstantiationLevel'][0]['nsLevelId']);
    });
  }

  onNsDfSelected(event:any) {
    var selectedDf = event.value;

    for (var i = 0; i < this.nsdObj['nsDf'].length; i++) {
      if (this.nsdObj['nsDf'][i]['nsDfId'] == selectedDf) {
        this.instLevels = this.nsdObj['nsDf'][i]['nsInstantiationLevel'];
      }
    }
  }

  createOnBoardCtxBlueprintRequest(blueprints: File[], nsds: File[]) {
    if(! this.thirdFormGroup.invalid ){
      var onBoardCtxRequest = JSON.parse('{}');
      onBoardCtxRequest['nsds'] = [];
      onBoardCtxRequest['translationRules'] = [];
      if (blueprints.length > 0) {
        var blueprint = blueprints[0];

        let promises = [];
        let blueprintPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(blueprint);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(blueprintPromise);

        for (let nsd of nsds) {
            let nsdPromise = new Promise(resolve => {
                let reader = new FileReader();
                reader.readAsText(nsd);
                reader.onload = () => resolve(reader.result);
            });
            promises.push(nsdPromise);
        }

        Promise.all(promises).then(fileContents => {
          onBoardCtxRequest['ctxBlueprint'] = JSON.parse(fileContents[0]);
            for (var i = 1; i < fileContents.length; i++) {
              onBoardCtxRequest['nsds'].push(JSON.parse(fileContents[i]));
            }

            if (this.translationParams !== undefined && this.translationParams.length !== 0){
              var translationRule = JSON.parse('{}');

              var blueprintId = onBoardCtxRequest.ctxBlueprint.blueprintId;
              var nsdId = this.thirdFormGroup.get('nsdId').value;
              var nsdVersion = this.thirdFormGroup.get('nsdVersion').value;
              var nsFlavourId = this.thirdFormGroup.get('nsFlavourId').value;
              var nsInstLevel = this.thirdFormGroup.get('nsInstLevel').value;

              translationRule['blueprintId'] = blueprintId;
              translationRule['nsdId'] = nsdId;
              translationRule['nsdVersion'] = nsdVersion;
              translationRule['nsFlavourId'] = nsFlavourId;
              translationRule['nsInstantiationLevelId'] = nsInstLevel;

              var paramsRows = this.thirdFormGroup.controls.items as FormArray;
              var controls = paramsRows.controls;
              var paramsObj = [];

              for (var j = 0; j < controls.length; j++) {
                paramsObj.push(controls[j].value);
                console.log(paramsObj);
              }
              translationRule['input'] = paramsObj;
              onBoardCtxRequest.translationRules.push(translationRule);

              console.log('onBoardCtxRequest: ' + JSON.stringify(onBoardCtxRequest, null, 4));
            }


          this.blueprintsEcService.postCtxBlueprint(onBoardCtxRequest)
            .subscribe(ctxBlueprintId => {
              console.log('Ctx Blueprint with id ' + ctxBlueprintId);
              this.blueprintEcComponent.selectedIndex = 0;
              this.firstFormGroup.reset();
              this.secondFormGroup.reset();
              this.thirdFormGroup.reset();
              this.blueprintEcComponent.getEcBlueprints();
            });
        });
      }
    }
  }


  createOnBoardCtxBlueprintRequestWithoutNsd(blueprints: File[]) {
      var onBoardCtxRequest = JSON.parse('{}');
      if (blueprints.length > 0) {
        var blueprint = blueprints[0];

        let promises = [];
        let blueprintPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(blueprint);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(blueprintPromise);

        Promise.all(promises).then(fileContents => {
          onBoardCtxRequest['ctxBlueprint'] = JSON.parse(fileContents[0]);


            var blueprintId = onBoardCtxRequest.ctxBlueprint.blueprintId;
            console.log('onBoardCtxRequest: ' + JSON.stringify(onBoardCtxRequest, null, 4));


          this.blueprintsEcService.postCtxBlueprint(onBoardCtxRequest)
            .subscribe(ctxBlueprintId => {
              console.log('Ctx Blueprint with id ' + ctxBlueprintId);
              this.blueprintEcComponent.selectedIndex = 0;
              this.firstFormGroup.reset();
              this.secondFormGroup.reset();
              this.thirdFormGroup.reset();
              this.blueprintEcComponent.getEcBlueprints();
            });

      });
      }
  }

}
