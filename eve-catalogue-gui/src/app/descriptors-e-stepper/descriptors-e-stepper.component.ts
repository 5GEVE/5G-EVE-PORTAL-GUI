
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DescriptorsExpService } from '../descriptors-exp.service';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { VsBlueprintInfo } from '../blueprints-compnents/blueprints-vs/vs-blueprint-info';
import { ExpBlueprintInfo } from '../blueprints-compnents/blueprints-e/exp-blueprint-info';
import { VsBlueprint } from '../blueprints-compnents/blueprints-vs/vs-blueprint';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { DescriptorsEComponent } from '../descriptors-e/descriptors-e.component';
import { CtxBlueprintInfo } from '../blueprints-compnents/blueprints-ec/ctx-blueprint-info';
import { TcBlueprintInfo } from '../blueprints-compnents/blueprints-tc/tc-blueprint-info';

import { DOCUMENT } from '@angular/common';

export interface ViewValue {
  value: string;
  viewValue: string;
  item: Object;
}

@Component({
  selector: 'app-descriptors-e-stepper',
  templateUrl: './descriptors-e-stepper.component.html',
  styleUrls: ['./descriptors-e-stepper.component.css']
})
export class DescriptorsEStepperComponent implements OnInit {

  formula = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  expBlueprints: ViewValue[] = [];
  expBlueprint = {};
  vsBlueprint: VsBlueprint = new VsBlueprint();
  ctxBlueprints: ViewValue[] = [];
  tcBlueprints: ViewValue[] = [];
  ranCon:string[];
  radioAccessTechnology:string[];
  embbMode:boolean;
  urllcMode:boolean;
  upLink=[];
  downLink=[];  
  latency=[];
  radio=[];
  endPArr=[];
  sliceElements = JSON.parse('{}');
  sliceProfilesMap: Map<string, any> = new Map<string, any>();
  managementTypes: String[] = [
    "PROVIDER_MANAGED",
    "TENANT_MANAGED"
  ];

  ssTypes: String[] = [
    "EMBB",
    "URLLC",
    "M_IOT"
  ];

  priorityTypes: String[] = [
    "LOW",
    "MEDIUM",
    "HIGH"
  ]

  timeTypes: String[] = [
    "SERVICE_CREATION_TIME_LOW",
    "SERVICE_CREATION_TIME_MEDIUM",
    "UNDEFINED"
  ];

  coverageTypes: String[] = [
    "AVAILABILITY_COVERAGE_HIGH",
    "AVAILABILITY_COVERAGE_MEDIUM",
    "UNDEFINED"
  ];

  panelOpenState = false;

  constructor(@Inject(DOCUMENT) private document,
    private _formBuilder: FormBuilder,
    private descriptorsExpService: DescriptorsExpService,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsExpService: BlueprintsExpService,
    private blueprintsCtxService: BlueprintsEcService,
    private blueprintsTcService: BlueprintsTcService,
    private descriptorExperiments: DescriptorsEComponent) { }

  ngOnInit() {
    this.ranCon=[];
    this.getExpBlueprints();
    this.firstFormGroup = this._formBuilder.group({
      expBlueprintId: ['', Validators.required],
      expDescName: ['', Validators.required],
      expDescVersion: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      vsDescName: ['', Validators.required],
      vsDescVersion: ['', Validators.required],
      managementType: [''],
      qosParam: [''],
      radioAccessTechnology:[''],
      //ssType: [''],
      isPublic: [false]/*,
      priorityType: ['', Validators.required],
      isSharable: [false],
      includeSharable: [false],
      prefProviders: ['', Validators.required],
      notPrefProviders: ['', Validators.required],
      prohibitedProviders: ['', Validators.required],
      timeType: ['', Validators.required],
      coverageType: ['', Validators.required],
      isLowCost: [false]*/
    });
    this.thirdFormGroup = this._formBuilder.group({
    });
    this.fourthFormGroup = this._formBuilder.group({
    });
    this.fifthFormGroup = this._formBuilder.group({
    });
  }

  sliceProfilesElements($event,endpointId,elem){
    if(elem=='radio'){
      this.sliceElements['radioAccessTechnology']= $event.value
    }
    if(elem=='Uplink'){
      this.sliceElements['uplinkThroughput']= $event.target.value
    }
    if(elem=='Downlink'){
      this.sliceElements['downlinkThroughput']= $event.target.value
    }
    if(elem=='latency'){
      this.sliceElements['latency']= $event.target.value
    }

    this.sliceProfilesMap.set(String(endpointId), this.sliceElements);
  }


  getExpBlueprints() {
    this.blueprintsExpService.getExpBlueprints().subscribe((expBlueprintInfos: ExpBlueprintInfo[]) =>
      {
        console.log("ExpBlueprintInfo",expBlueprintInfos)
        for (var i = 0; i < expBlueprintInfos.length; i++) {
          this.expBlueprints.push({value: expBlueprintInfos[i]['expBlueprintId'], viewValue: expBlueprintInfos[i]['expBlueprint']['description'], item: expBlueprintInfos[i]['expBlueprint']});
        }
      });
  }

  onExpBSelected(event: any) {
    this.descriptorsExpService.getCoverageArea('ITALY_TURIN').subscribe((info) =>
    {
    //  console.log("info",info)
    });
    
    var selectedBlueprint = event.value;
    var vsbId;
    for (var i = 0; i < this.expBlueprints.length; i ++) {
      if (this.expBlueprints[i]['value'] == selectedBlueprint) {
        this.expBlueprint = this.expBlueprints[i]['item'];
        vsbId = this.expBlueprints[i]['item']['vsBlueprintId'];
      }
    }
    var ctxBlueprintIds = this.expBlueprint['ctxBlueprintIds'];
    var tcBlueprintIds = this.expBlueprint['tcBlueprintIds'];
    //console.log(ctxBlueprintIds);
    //console.log(tcBlueprintIds);
    if (ctxBlueprintIds !== undefined){
      for (var i = 0; i < ctxBlueprintIds.length; i++) {
        this.getCtxBlueprint(ctxBlueprintIds[i]);
      }
    }


    for (var i = 0; i < tcBlueprintIds.length; i++) {
      this.getTcBlueprint(tcBlueprintIds[i]);
    }
    this.getVsBlueprint(vsbId);
  }
/*
  getVsBlueprint(vsBlueprintId: string) {
    this.ranCon=[];
    this.blueprintsVsService.getVsBlueprint(vsBlueprintId).subscribe((vsBlueprintInfo: VsBlueprintInfo) =>
      {
        this.vsBlueprint = vsBlueprintInfo['vsBlueprint'];
      });
  }
  */

  getVsBlueprint(vsBlueprintId: string) {
  var coverageAreaBySite={
    "_embedded": {
      "coverageAreas": [
        {
          "id": 1,
          "name": "ITALY.TIM_LAB",
          "radioAccessTechnologies": [
            "4G",
            "5GSA",
            "5GNSA"
          ],
          "latitude": 45.0984399,
          "longitude": 7.6608915,
          "radius": 1.0,
          "frequencies": [
            "800MHz"
          ],
          "_links": {
            "self": {
              "href": "http://10.3.3.30:8087/coverageAreas/1"
            },
            "coverageArea": {
              "href": "http://10.3.3.30:8087/coverageAreas/1"
            },
            "ranOrchestrator": {
              "href": "http://10.3.3.30:8087/coverageAreas/1/ranOrchestrator"
            }
          }
        }
      ]
    },
    "_links": {
      "self": {
        "href": "http://10.3.3.30:8087/coverageAreas/search/findBySiteName?name=ITALY_TURIN"
      }
    }
  }
  for(var cva of coverageAreaBySite._embedded.coverageAreas){
    this.radioAccessTechnology=cva['radioAccessTechnologies'];
  }
    this.ranCon=[];
    this.blueprintsVsService.getVsBlueprint(vsBlueprintId).subscribe((vsBlueprintInfo: VsBlueprintInfo) =>
      {
        this.vsBlueprint = vsBlueprintInfo['vsBlueprint'];
        for(var vs of this.vsBlueprint['endPoints']){
            if(vs['ranConnection']){
              console.log("ran connection tue",vs['endPointId'])
               this.ranCon.push(vs['endPointId'])
               if(vs['sliceType']=='EMBB'){
                 this.embbMode=true;
               }else if(vs['sliceType']=='URLLC'){
                 this.urllcMode=true;
               }

              /*
              if(this.vsBlueprint['interSite']){
                for(var assosiatedVsb of this.vsBlueprint['atomicComponents']){
      
                 // this.vasbIds.push(assosiatedVsb['associatedVsbId'])
                }
      
              } 
              */
            }
            else{
             // console.log("vsBlueprintInfo",vsBlueprintInfo)

            }
          }




      });
  }

  getCtxBlueprint(ctxBlueprintId: string) {
    this.blueprintsCtxService.getCtxBlueprint(ctxBlueprintId).subscribe((ctxBlueprintInfo: CtxBlueprintInfo) =>
      {
        this.ctxBlueprints.push({value: ctxBlueprintInfo['ctxBlueprintId'], viewValue: ctxBlueprintInfo['ctxBlueprint']['description'], item: ctxBlueprintInfo['ctxBlueprint']});
        //console.log(this.ctxBlueprints);
      });
  }

  getTcBlueprint(tcBlueprintId: string) {
    this.blueprintsTcService.getTcBlueprint(tcBlueprintId).subscribe((tcBlueprintInfo: TcBlueprintInfo) =>
      {
        this.tcBlueprints.push({value: tcBlueprintInfo['testCaseBlueprintId'], viewValue: tcBlueprintInfo['testCaseBlueprint']['description'], item: tcBlueprintInfo['testCaseBlueprint']});
        //console.log(this.tcBlueprints);
      });
  }

  createOnBoardExpDescriptorRequest() {

 //   this.sliceProfilesMap.set(String(vsbId), this.nsdArr[0]);

    var onBoardExpRequest = JSON.parse('{}');
    onBoardExpRequest['testCaseConfiguration'] = [];
    onBoardExpRequest['contextDetails'] = [];
    onBoardExpRequest['vsDescriptor'] = {};

    onBoardExpRequest['experimentBlueprintId'] = this.firstFormGroup.get('expBlueprintId').value;
    onBoardExpRequest['name'] = this.firstFormGroup.get('expDescName').value;
    onBoardExpRequest['version'] = this.firstFormGroup.get('expDescVersion').value;
    onBoardExpRequest['tenantId'] = localStorage.getItem('username');
    onBoardExpRequest['kpiThresholds'] = {};

    if (this.expBlueprint['kpis'] !== undefined && this.expBlueprint['kpis'] !== []) {
      for (var j = 0; j < this.expBlueprint['kpis'].length; j++) {
        var expb_kpiId = {};
        expb_kpiId['lowerBound'] = this.document.getElementById('metric_' + this.expBlueprint['kpis'][j]['kpiId'] + 'lowerBound').value;
        expb_kpiId['upperBound'] = this.document.getElementById('metric_' + this.expBlueprint['kpis'][j]['kpiId'] + 'upperBound').value;
        onBoardExpRequest['kpiThresholds'][this.expBlueprint['kpis'][j]['kpiId']] = expb_kpiId;
      }
    }

    for (var i = 0; i < this.ctxBlueprints.length; i++) {
      var tempCtx = {};
      tempCtx['blueprintId'] = this.ctxBlueprints[i].value;
      tempCtx['parameters'] = {};
      if (this.ctxBlueprints[i]['item']['parameters'] !== [] && this.ctxBlueprints[i]['item']['parameters'] !== undefined) {
        for (var j = 0; j < this.ctxBlueprints[i]['item']['parameters'].length; j++) {
          tempCtx['parameters'][this.ctxBlueprints[i]['item']['parameters'][j]['parameterId']] =
          this.document.getElementById(this.ctxBlueprints[i]['item']['parameters'][j]['parameterId']).value;
        }
        onBoardExpRequest['contextDetails'].push(tempCtx);
      }

    }

    onBoardExpRequest['vsDescriptor']['name'] = this.secondFormGroup.get('vsDescName').value;
    onBoardExpRequest['vsDescriptor']['version'] = this.secondFormGroup.get('vsDescVersion').value;
    onBoardExpRequest['vsDescriptor']['vsBlueprintId'] = this.vsBlueprint['blueprintId'];
    let jsonObject = {};  
    this.sliceProfilesMap.forEach((value, key) => {  
        jsonObject[key] = value  
    });  
    onBoardExpRequest['vsDescriptor']['sliceProfiles'] = jsonObject;
  //  console.log("sssssss",jsonObject)
   // onBoardExpRequest['vsDescriptor']['sst'] = this.secondFormGroup.get('ssType').value;
    if (this.secondFormGroup.get('managementType').value === '') {
      onBoardExpRequest['vsDescriptor']['managementType'] = "PROVIDER_MANAGED";
    } else {
      onBoardExpRequest['vsDescriptor']['managementType'] = this.secondFormGroup.get('managementType').value;
    }

    var qosParameters = {};

    if(this.vsBlueprint['parameters'] !== undefined){
      for (var i = 0; i < this.vsBlueprint['parameters'].length; i++) {
        qosParameters[this.vsBlueprint['parameters'][i]['parameterId']] =
          this.document.getElementById('qos_' + this.vsBlueprint['parameters'][i]['parameterId']).value;
      }
      onBoardExpRequest['vsDescriptor']['qosParameters'] = qosParameters;
    }



    /*onBoardExpRequest['vsDescriptor']['serviceConstraints'] = [];

    for (var i = 0; i < this.vsBlueprint['atomicComponents'].length; i++) {
      var tempConstr = {};
      tempConstr['atomicComponentId'] = this.vsBlueprint['atomicComponents'][i]['componentId'];
      tempConstr['canIncludeSharedElements'] = this.secondFormGroup.get('includeSharable').value;
      tempConstr['nonPreferredProviders'] = [this.secondFormGroup.get('notPrefProviders').value];
      tempConstr['preferredProviders'] = [this.secondFormGroup.get('prefProviders').value];
      tempConstr['prohibitedProviders'] = [this.secondFormGroup.get('prohibitedProviders').value];
      tempConstr['priority'] = this.secondFormGroup.get('priorityType').value;
      tempConstr['sharable'] = this.secondFormGroup.get('isSharable').value;
      onBoardExpRequest['vsDescriptor']['serviceConstraints'].push(tempConstr);
    }

    onBoardExpRequest['vsDescriptor']['sla'] = {};
    onBoardExpRequest['vsDescriptor']['sla']['availabilityCoverage'] = this.secondFormGroup.get('coverageType').value;
    onBoardExpRequest['vsDescriptor']['sla']['serviceCreationTime'] = this.secondFormGroup.get('timeType').value;
    onBoardExpRequest['vsDescriptor']['sla']['lowCostRequired'] = this.secondFormGroup.get('isLowCost').value;
    onBoardExpRequest['vsDescriptor']['isPublic'] = this.secondFormGroup.get('isPublic').value;*/

    for (var i = 0; i < this.tcBlueprints.length; i++) {
      var tempTc = {};
      tempTc['blueprintId'] = this.tcBlueprints[i].value;
      //console.log(this.tcBlueprints[i]);

      if(this.tcBlueprints[i]['item']['userParameters'] !== undefined){
        tempTc['parameters'] = {};
          let userParams = new Map(Object.entries(this.tcBlueprints[i]['item']['userParameters']));
          for (let key of userParams.keys()) {
            tempTc['parameters'][key] = this.document.getElementById("user_" + key).value;
         }
      }

      /*
      if (this.tcBlueprints[i]['item']['infrastructureParameters']) {
        let infraParams = new Map(Object.entries(this.tcBlueprints[i]['item']['infrastructureParameters']));
        for (let key of infraParams.keys()) {
          tempTc['parameters'][key] = this.document.getElementById("infra_" + key).value;
        }
      }
      */
      onBoardExpRequest['testCaseConfiguration'].push(tempTc);
    }


    console.log('onBoardExpRequest: ' + JSON.stringify(onBoardExpRequest, null, 4));
    this.descriptorsExpService.postExpDescriptor(onBoardExpRequest)
      .subscribe(expDescriptortId => {
        //console.log("Successfully uploaded new Exp Descriptor with id " + expDescriptortId);
        this.descriptorExperiments.selectedIndex = 0;
        this.descriptorExperiments.getExpDescriptors();

      });
  }
}

