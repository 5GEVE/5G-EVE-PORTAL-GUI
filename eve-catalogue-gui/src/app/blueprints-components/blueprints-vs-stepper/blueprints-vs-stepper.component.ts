import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BlueprintsVsService } from '../../blueprints-vs.service';
import { BlueprintsVsComponent} from '../blueprints-vs/blueprints-vs.component';

@Component({
  selector: 'app-blueprints-vs-stepper',
  templateUrl: './blueprints-vs-stepper.component.html',
  styleUrls: ['./blueprints-vs-stepper.component.css']
})
export class BlueprintsVsStepperComponent implements OnInit {

  nsdObj: Object;

  vsbObj: Object;

  dfs: String[] = [];

  instLevels: String[] = [];

  translationParams: String[] = [];

  isLinear = true;
  items: FormArray;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsVsComponent: BlueprintsVsComponent) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      deploymentType: ['']
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


  onUploadedVsb(event: any, vsbs: File[]) {
    //console.log(event);

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

        //console.log(JSON.stringify(this.vsbObj, null, 4));
        if (this.vsbObj['parameters'] !== undefined){
//          this.translationParams = this.vsbObj['parameters'];
          for (var i = 0; i < this.vsbObj['parameters'].length; i++){
            this.items = this.thirdFormGroup.get('items') as FormArray;
            this.items.push(this.createItem());
            console.log(this.vsbObj['parameters'][i]['parameterId']);
            this.translationParams.push(this.vsbObj['parameters'][i]['parameterId']);
          }
        } else {
          console.log("no parameters found");
        }
        console.log(JSON.stringify(this.translationParams, null, 4));
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

  onNsDfSelected(event:any) {
    var selectedDf = event.value;

    for (var i = 0; i < this.nsdObj['nsDf'].length; i++) {
      if (this.nsdObj['nsDf'][i]['nsDfId'] == selectedDf) {
        this.instLevels = this.nsdObj['nsDf'][i]['nsInstantiationLevel'];
      }
    }
  }


  createOnBoardingRequestWithoutNsds(blueprints: File[]){
    if (blueprints.length > 0) {
      var blueprint = blueprints[0];
      var onBoardVsRequest = JSON.parse('{}');
      let promises = [];
      let blueprintPromise = new Promise(resolve => {
          let reader = new FileReader();
          reader.readAsText(blueprint);
          reader.onload = () => resolve(reader.result);
      });
      promises.push(blueprintPromise);


      Promise.all(promises).then(fileContents => {
          onBoardVsRequest['vsBlueprint'] = JSON.parse(fileContents[0]);
          for (var i = 1; i < fileContents.length; i++) {
            onBoardVsRequest['nsds'].push(JSON.parse(fileContents[i]));
          }

          //var blueprintId = onBoardVsRequest.vsBlueprint.blueprintId;


          this.blueprintsVsService.postVsBlueprint(onBoardVsRequest)
          .subscribe(vsBlueprintId => {
            console.log("VS Blueprint with id " + vsBlueprintId);
            this.blueprintsVsComponent.selectedIndex = 0;
            this.blueprintsVsComponent.getVsBlueprints();
          });
      });
    }
  }

  createOnBoardVsBlueprintRequest(blueprints: File[], nsds: File[]) {
    if(!this.thirdFormGroup.invalid){
    var onBoardVsRequest = JSON.parse('{}');
    onBoardVsRequest['nsds'] = [];
    onBoardVsRequest['translationRules'] = [];
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
          onBoardVsRequest['vsBlueprint'] = JSON.parse(fileContents[0]);
          for (var i = 1; i < fileContents.length; i++) {
            onBoardVsRequest['nsds'].push(JSON.parse(fileContents[i]));
          }
          if (this.translationParams !== undefined && this.translationParams.length !== 0){
           console.log(this.translationParams.length);

            var translationRule = JSON.parse('{}');
            //var blueprintId = onBoardVsRequest.vsBlueprint.blueprintId;
            var nsdId = this.thirdFormGroup.get('nsdId').value;
            var nsdVersion = this.thirdFormGroup.get('nsdVersion').value;
            var nsFlavourId = this.thirdFormGroup.get('nsFlavourId').value;
            var nsInstLevel = this.thirdFormGroup.get('nsInstLevel').value;


            translationRule['nsdId'] = nsdId;
            translationRule['nsdVersion'] = nsdVersion;
            translationRule['nsFlavourId'] = nsFlavourId;
            translationRule['nsInstantiationLevelId'] = nsInstLevel;

                      //translationRule['blueprintId'] = blueprintId;
          var paramsRows = this.thirdFormGroup.controls.items as FormArray;
          console.log(paramsRows.controls);
          var controls = paramsRows.controls;
          var paramsObj = [];

          for (var j = 0; j < controls.length; j++) {
            paramsObj.push(controls[j].value);
            //console.log(paramsObj);
          }

          var blueprintId = onBoardVsRequest.vsBlueprint.blueprintId;

          translationRule['input'] = paramsObj;
          onBoardVsRequest.translationRules.push(translationRule);


          } else {
            console.log('translationRules empty');
          }
          //console.log('onBoardVsRequest: ' + JSON.stringify(onBoardVsRequest, null, 4));

          this.blueprintsVsService.postVsBlueprint(onBoardVsRequest)
          .subscribe(vsBlueprintId => {
            console.log("VS Blueprint with id " + vsBlueprintId);
            this.blueprintsVsComponent.selectedIndex = 0;
            this.blueprintsVsComponent.getVsBlueprints();
          });
      });
    }
  }
  }
}
