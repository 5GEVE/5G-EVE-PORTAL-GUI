
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DescriptorsExpService } from '../descriptors-exp.service';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { VsBlueprintInfo } from '../blueprints-components/blueprints-vs/vs-blueprint-info';
import { ExpBlueprintInfo } from '../blueprints-components/blueprints-e/exp-blueprint-info';
import { VsBlueprint } from '../blueprints-components/blueprints-vs/vs-blueprint';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { IWFRepository }  from '../iwf-repository.service';
import { DescriptorsEComponent } from '../descriptors-e/descriptors-e.component';
import { CtxBlueprintInfo } from '../blueprints-components/blueprints-ec/ctx-blueprint-info';
import { TcBlueprintInfo } from '../blueprints-components/blueprints-tc/tc-blueprint-info';
import { CoverageAreaInfo } from './coverage-area-info';

import { DOCUMENT } from '@angular/common';
import { ExperimentDescriptorRequest } from './experiment-descriptor-request';
import { VsDescriptorInfo } from '../descriptors-vs/vs-descriptor-info';

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
  embbMode:boolean[] = [];
  urllcMode:boolean[] = [];
  upLink=[];
  downLink=[];
  latency=[];
  radio=[];
  endPArr=[];
  listOfVsbs: VsBlueprint[] = [];
  activeCoverageAreas: CoverageAreaInfo[] = [];
  sliceElements = JSON.parse('{}');
  sliceProfilesMap: Map<string, any> = new Map<string, any>();
  managementTypes: String[] = [
    "PROVIDER_MANAGED",
    "TENANT_MANAGED"
  ];

  experimentDescriptorRequest: ExperimentDescriptorRequest = new ExperimentDescriptorRequest();

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
    private descriptorExperiments: DescriptorsEComponent,
    private iwfRepo: IWFRepository) { }

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

  tempSliceProfiles: object [] = [];
  selectRATElement($event, coverageArea, element, index){
    //console.log(coverageArea);
    if (index < this.tempSliceProfiles.length){
      if(element === 'radio'){
        this.tempSliceProfiles[index]['radioAccessTechnology']= $event.value;
      } else if (element === 'Uplink'){
        this.tempSliceProfiles[index]['uplinkThroughput']= $event.target.value
      } else if (element === 'Downlink'){
        this.tempSliceProfiles[index]['downlinkThroughput']= $event.target.value
      } else if (element === 'latency'){
        this.tempSliceProfiles[index]['latency']= $event.target.value
      } else {
        console.log("ERROR: element " + element + " not recognized");
      }
    } else {
      var newSliceProfile = {};
      var errorFound = false;
      if(element === 'radio'){
        newSliceProfile['radioAccessTechnology']= $event.value;
      } else if (element === 'Uplink'){
        newSliceProfile['uplinkThroughput']= $event.target.value
      } else if (element === 'Downlink'){
        newSliceProfile['downlinkThroughput']= $event.target.value
      } else if (element === 'latency'){
        newSliceProfile['latency']= $event.target.value
      } else {
        console.log("ERROR: element " + element + " not recognized");
        errorFound = true;
      }
      if (!errorFound){
        newSliceProfile['coverageArea'] = coverageArea;
        this.tempSliceProfiles.push(newSliceProfile);
      }
    }
    //console.log(JSON.stringify(this.tempSliceProfiles));
  }

  // sliceProfilesElements($event,endpointId,elem){
  //   if(elem=='radio'){
  //     this.sliceElements['radioAccessTechnology']= $event.value
  //   }
  //   if(elem=='Uplink'){
  //     this.sliceElements['uplinkThroughput']= $event.target.value
  //   }
  //   if(elem=='Downlink'){
  //     this.sliceElements['downlinkThroughput']= $event.target.value
  //   }
  //   if(elem=='latency'){
  //     this.sliceElements['latency']= $event.target.value
  //   }
  //   this.sliceProfilesMap.set(String(endpointId), this.sliceElements);
  // }


  getExpBlueprints() {
    this.blueprintsExpService.getExpBlueprints().subscribe((expBlueprintInfos: ExpBlueprintInfo[]) =>
      {
        //console.log("ExpBlueprintInfo",expBlueprintInfos)
        for (var i = 0; i < expBlueprintInfos.length; i++) {
          this.expBlueprints.push({value: expBlueprintInfos[i]['expBlueprintId'], viewValue: expBlueprintInfos[i]['expBlueprint']['name'], item: expBlueprintInfos[i]['expBlueprint']});
        }
      });
  }

  // getCoverageAreaDetails(site: string){
  //   this.descriptorsExpService.getCoverageArea('ITALY_TURIN').subscribe((info) =>
  //   {
  //   return info;
  //   });
  // }


  onExpBSelected(event: any) {
    //get expriment blueprint
    //get vsb
      //if composite, get associated VSBs
    this.activeCoverageAreas = [];
    this.listOfVsbs = [];
    this.blueprintsExpService.getExpBlueprint(event.value).subscribe((expDescriptor: ExpBlueprintInfo) => {
      this.blueprintsVsService.getVsBlueprints().subscribe((vsBlueprints: VsBlueprintInfo[]) => {
        this.iwfRepo.getCoverageAreas().subscribe((coverageAreas) => {
          for (let a = 0; a < vsBlueprints.length; a++){
            if(expDescriptor.expBlueprint['vsBlueprintId'] === vsBlueprints[a].vsBlueprintId){
              if (vsBlueprints[a].vsBlueprint.interSite){
                vsBlueprints[a].vsBlueprint.atomicComponents.forEach(element => {

                  for (let b = 0; b < vsBlueprints.length; b++){
                    if(element['associatedVsbId'] === vsBlueprints[b].vsBlueprintId){
                      this.listOfVsbs.push(vsBlueprints[b].vsBlueprint);
                    }
                  }
                });
              } else {
                this.listOfVsbs.push(vsBlueprints[a].vsBlueprint);
              }
            }
          }


          // for each endpoint, need to map
          //console.log(this.listOfVsbs);
          for (let i = 0; i < this.listOfVsbs.length; i++){
            for (let j = 0; j < this.listOfVsbs[i].endPoints.length; j++){
              if (this.listOfVsbs[i].endPoints[j]['ranConnection'] && this.listOfVsbs[i].endPoints[j]['coverageArea'] !== undefined && this.listOfVsbs[i].endPoints[j]['coverageArea'] !== null){
                for (let k = 0; k < coverageAreas['_embedded']['coverageAreas'].length; k++){
                  if (this.listOfVsbs[i].endPoints[j]['coverageArea'] === coverageAreas['_embedded']['coverageAreas'][k]['name']){
                    //console.log("here i am: " + JSON.stringify(this.listOfVsbs[i].endPoints[j]));
                    var coverageAreaInfo: CoverageAreaInfo = new CoverageAreaInfo();
                    coverageAreaInfo.coverageArea = this.listOfVsbs[i].endPoints[j]['coverageArea'];
                    coverageAreaInfo.rat = coverageAreas['_embedded']['coverageAreas'][k]['radioAccessTechnologies'];
                    coverageAreaInfo.sst = this.listOfVsbs[i].endPoints[j]['sliceType'];
                    coverageAreaInfo.vsBlueprintId = this.listOfVsbs[i].blueprintId;
                    coverageAreaInfo.endPointId = this.listOfVsbs[i].endPoints[j]['endPointId'];
                    let existing: boolean = false;
                    for (let l = 0; l < this.activeCoverageAreas.length; l++){
                      if(this.activeCoverageAreas[l].coverageArea === coverageAreaInfo['coverageArea']){
                        existing = true;
                      }
                    }
                    if (!existing){
                      this.activeCoverageAreas.push(coverageAreaInfo);
                    }
                  }
                }
              }
            }
          }
          //to be removed, just for test purposes
          // var testArea: CoverageAreaInfo = new CoverageAreaInfo();
          // testArea.coverageArea = 'FRANCE.ORANGE_LAB';
          // testArea.rat = ["4G", "5GSA"];
          // testArea.sst = "URLLC";
          // testArea.vsBlueprintId = "45";
          // testArea.endPointId = "testEndpointId";
          // this.activeCoverageAreas.push(testArea);
          //console.log("Result: " + JSON.stringify(this.activeCoverageAreas));

        })
      });
    });


    // this.descriptorsExpService.getCoverageArea('ITALY_TURIN').subscribe((info) =>
    // {
    // //  console.log("info",info)
    // });

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
    console.log(JSON.stringify(this.experimentDescriptorRequest));
    this.getVsBlueprint(vsbId);
  }

  getVsBlueprint(vsBlueprintId: string) {
    this.ranCon=[];
    this.blueprintsVsService.getVsBlueprint(vsBlueprintId).subscribe((vsBlueprintInfo: VsBlueprintInfo) =>
      {
        this.vsBlueprint = vsBlueprintInfo['vsBlueprint'];
      });
  }

  // getVsBlueprint(vsBlueprintId: string) {
  // var coverageAreaBySite={
  //   "_embedded": {
  //     "coverageAreas": [
  //       {
  //         "id": 1,
  //         "name": "ITALY.TIM_LAB",
  //         "radioAccessTechnologies": [
  //           "4G",
  //           "5GSA",
  //           "5GNSA"
  //         ],
  //         "latitude": 45.0984399,
  //         "longitude": 7.6608915,
  //         "radius": 1.0,
  //         "frequencies": [
  //           "800MHz"
  //         ],
  //         "_links": {
  //           "self": {
  //             "href": "http://10.3.3.30:8087/coverageAreas/1"
  //           },
  //           "coverageArea": {
  //             "href": "http://10.3.3.30:8087/coverageAreas/1"
  //           },
  //           "ranOrchestrator": {
  //             "href": "http://10.3.3.30:8087/coverageAreas/1/ranOrchestrator"
  //           }
  //         }
  //       }
  //     ]
  //   },
  //   "_links": {
  //     "self": {
  //       "href": "http://10.3.3.30:8087/coverageAreas/search/findBySiteName?name=ITALY_TURIN"
  //     }
  //   }
  // }
  // for(var cva of coverageAreaBySite._embedded.coverageAreas){
  //   this.radioAccessTechnology=cva['radioAccessTechnologies'];
  // }
  //   this.ranCon=[];
  //   this.blueprintsVsService.getVsBlueprint(vsBlueprintId).subscribe((vsBlueprintInfo: VsBlueprintInfo) =>
  //     {
  //       this.vsBlueprint = vsBlueprintInfo['vsBlueprint'];
  //       for(var vs of this.vsBlueprint['endPoints']){
  //           if(vs['ranConnection'] && vs['coverageArea']){
  //             console.log("ran connection tue",vs['endPointId'])
  //              this.ranCon.push(vs['endPointId'])
  //              if(vs['sliceType']=='EMBB'){
  //                this.embbMode=true;
  //              }else if(vs['sliceType']=='URLLC'){
  //                this.urllcMode=true;
  //              }

  //             /*
  //             if(this.vsBlueprint['interSite']){
  //               for(var assosiatedVsb of this.vsBlueprint['atomicComponents']){

  //                // this.vasbIds.push(assosiatedVsb['associatedVsbId'])
  //               }

  //             }
  //             */
  //           }
  //           else{
  //            // console.log("vsBlueprintInfo",vsBlueprintInfo)

  //           }
  //         }




  //     });
  // }

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
        console.log(this.tcBlueprints);
      });
  }

  createOnBoardExpDescriptorRequest() {

 //   this.sliceProfilesMap.set(String(vsbId), this.nsdArr[0]);


    // construct experimentDescriptorRequest element

    this.experimentDescriptorRequest.experimentBlueprintId = this.firstFormGroup.get('expBlueprintId').value;
    this.experimentDescriptorRequest.version = this.firstFormGroup.get('expDescVersion').value;
    this.experimentDescriptorRequest.name = this.firstFormGroup.get('expDescName').value;
    this.experimentDescriptorRequest.tenantId = localStorage.getItem('username');

//    var onBoardExpRequest = JSON.parse('{}');
//    onBoardExpRequest['testCaseConfiguration'] = [];
//    onBoardExpRequest['contextDetails'] = [];
//    onBoardExpRequest['vsDescriptor'] = {};

//    onBoardExpRequest['experimentBlueprintId'] = this.firstFormGroup.get('expBlueprintId').value;
//    onBoardExpRequest['name'] = this.firstFormGroup.get('expDescName').value;
//    onBoardExpRequest['version'] = this.firstFormGroup.get('expDescVersion').value;
//    onBoardExpRequest['tenantId'] = localStorage.getItem('username');
//    onBoardExpRequest['kpiThresholds'] = {};

    if (this.expBlueprint['kpis'] !== undefined && this.expBlueprint['kpis'] !== []) {
      for (var j = 0; j < this.expBlueprint['kpis'].length; j++) {
        var expb_kpiId = {};
        expb_kpiId['lowerBound'] = this.document.getElementById('metric_' + this.expBlueprint['kpis'][j]['kpiId'] + 'lowerBound').value;
        expb_kpiId['upperBound'] = this.document.getElementById('metric_' + this.expBlueprint['kpis'][j]['kpiId'] + 'upperBound').value;
        //onBoardExpRequest['kpiThresholds'][this.expBlueprint['kpis'][j]['kpiId']] = expb_kpiId;
        this.experimentDescriptorRequest.kpiThresholds[this.expBlueprint['kpis'][j]['kpiId']] = expb_kpiId;
      }
    }

    for (var i = 0; i < this.ctxBlueprints.length; i++) {
      var tempCtx: object = {};
      tempCtx['blueprintId'] = this.ctxBlueprints[i].value;
      tempCtx['parameters'] = {};
      if (this.ctxBlueprints[i]['item']['parameters'] !== [] && this.ctxBlueprints[i]['item']['parameters'] !== undefined) {
        for (var j = 0; j < this.ctxBlueprints[i]['item']['parameters'].length; j++) {
          tempCtx['parameters'][this.ctxBlueprints[i]['item']['parameters'][j]['parameterId']] =
          this.document.getElementById(this.ctxBlueprints[i]['item']['parameters'][j]['parameterId']).value;
        }
        //onBoardExpRequest['contextDetails'].push(tempCtx);
        this.experimentDescriptorRequest.contextDetails.push(tempCtx);
      }

    }
    this.experimentDescriptorRequest.vsDescriptor.name = this.secondFormGroup.get('vsDescName').value;
//    onBoardExpRequest['vsDescriptor']['name'] = this.secondFormGroup.get('vsDescName').value;
    this.experimentDescriptorRequest.vsDescriptor.version = this.secondFormGroup.get('vsDescVersion').value;
//    onBoardExpRequest['vsDescriptor']['version'] = this.secondFormGroup.get('vsDescVersion').value;
    this.experimentDescriptorRequest.vsDescriptor.vsBlueprintId = this.vsBlueprint['blueprintId'];
//    onBoardExpRequest['vsDescriptor']['vsBlueprintId'] = this.vsBlueprint['blueprintId'];
    // let jsonObject = {};
    // this.sliceProfilesMap.forEach((value, key) => {
    //     jsonObject[key] = value
    // });
    // onBoardExpRequest['vsDescriptor']['sliceProfiles'] = jsonObject;
    var sliceProfiles = new Map();
    for (let i = 0; i < this.activeCoverageAreas.length; i ++){
      for (let j = 0; j < this.tempSliceProfiles.length; j++){
        var sliceElement = {};
        if (this.activeCoverageAreas[i].coverageArea === this.tempSliceProfiles[j]['coverageArea']){
          if(this.tempSliceProfiles[j]['radioAccessTechnology'] !== undefined){
            switch(this.tempSliceProfiles[j]['radioAccessTechnology']){
              case '5GSA': {
                sliceElement['radioAccessTechnology'] = 'FIVE_G_SA'; break;
              }
              case '5GNSA': {
                sliceElement['radioAccessTechnology'] = 'FIVE_G_NSA'; break;
              }
              case '4G': {
                sliceElement['radioAccessTechnology'] = 'FOUR_G'; break;
              }
              case '5GmmWave': {
                sliceElement['radioAccessTechnology'] = 'FIVE_G_mmWave'; break;
              }
              case 'LTE-M': {
                sliceElement['radioAccessTechnology'] = 'LTE_M'; break;
              }
              case 'NB-IoT': {
                sliceElement['radioAccessTechnology'] = 'NB_IoT'; break;
              }
              default: {
                sliceElement['radioAccessTechnology'] = this.tempSliceProfiles[j]['radioAccessTechnology']; break;
              }

            }
          }
          if (this.tempSliceProfiles[j]['uplinkThroughput'] !== undefined){
            sliceElement['uplinkThroughput'] = this.tempSliceProfiles[j]['uplinkThroughput'];
          }
          if (this.tempSliceProfiles[j]['downlinkThroughput'] !== undefined){
            sliceElement['downlinkThroughput'] = this.tempSliceProfiles[j]['downlinkThroughput'];
          }
          if (this.tempSliceProfiles[j]['latency'] !== undefined ){
            sliceElement['latency'] = this.tempSliceProfiles[j]['latency'];
          }
          console.log("endPointId: " + this.activeCoverageAreas[i].endPointId + " : " + JSON.stringify(sliceElement));
          sliceProfiles[this.activeCoverageAreas[i].endPointId] = sliceElement;
        }
      }
    }
    console.log(JSON.stringify(sliceProfiles));
    this.experimentDescriptorRequest.vsDescriptor.sliceProfiles = sliceProfiles;

//  console.log("sssssss",jsonObject)
   // onBoardExpRequest['vsDescriptor']['sst'] = this.secondFormGroup.get('ssType').value;
    if (this.secondFormGroup.get('managementType').value === '') {
//      onBoardExpRequest['vsDescriptor']['managementType'] = "PROVIDER_MANAGED";
      this.experimentDescriptorRequest.vsDescriptor.managementType = "PROVIDER_MANAGED";
    } else {
      this.experimentDescriptorRequest.vsDescriptor.managementType = this.secondFormGroup.get('managementType').value;
//      onBoardExpRequest['vsDescriptor']['managementType'] = this.secondFormGroup.get('managementType').value;
    }

    var qosParameters = new Map<string, string>();

    if(this.vsBlueprint['parameters'] !== undefined){
      for (var i = 0; i < this.vsBlueprint['parameters'].length; i++) {
        qosParameters[this.vsBlueprint['parameters'][i]['parameterId']] =
          this.document.getElementById('qos_' + this.vsBlueprint['parameters'][i]['parameterId']).value;
      }
      this.experimentDescriptorRequest.vsDescriptor.qosParameters = qosParameters;
//      onBoardExpRequest['vsDescriptor']['qosParameters'] = qosParameters;
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
    console.log(this.tcBlueprints);
    for (var i = 0; i < this.tcBlueprints.length; i++) {
      var tempTc = {};
      tempTc['blueprintId'] = this.tcBlueprints[i].value;
      console.log(this.tcBlueprints[i]);

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
//     onBoardExpRequest['testCaseConfiguration'].push(tempTc);
     this.experimentDescriptorRequest.testCaseConfiguration.push(tempTc);
    }


    console.log('onBoardExpRequest: ' + JSON.stringify(this.experimentDescriptorRequest, null, 4));
    this.descriptorsExpService.postExpDescriptor(this.experimentDescriptorRequest)
      .subscribe(expDescriptortId => {
        //console.log("Successfully uploaded new Exp Descriptor with id " + expDescriptortId);
        this.descriptorExperiments.selectedIndex = 0;
        this.descriptorExperiments.getExpDescriptors();
      });
  }
}

