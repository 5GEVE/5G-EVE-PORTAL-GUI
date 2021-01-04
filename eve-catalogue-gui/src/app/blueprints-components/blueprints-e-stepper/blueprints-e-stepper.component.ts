
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { VsBlueprintInfo } from '../blueprints-vs/vs-blueprint-info';
import { BlueprintsVsService } from '../../blueprints-vs.service';
import { BlueprintsEcService } from '../../blueprints-ec.service';
import { CtxBlueprintInfo } from '../blueprints-ec/ctx-blueprint-info';
import { BlueprintsTcService } from '../../blueprints-tc.service';
import { TcBlueprintInfo } from '../blueprints-tc/tc-blueprint-info';
import { BlueprintsExpService } from '../../blueprints-exp.service';
import { MatStepper } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormulaCheckService} from '../../formula-check.service';
import { FormulaCheckInfo} from '../../formula-check-info';
import { BlueprintsEComponent} from '../blueprints-e/blueprints-e.component';
import { NsdsService} from '../../nsds.service';
import { AuthService} from '../../auth.service';
import {FormControl} from '@angular/forms';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

export interface Site {
  value: string;
  viewValue: string;
}

export interface Blueprint {
  value: String;
  viewValue: String;
  sites: String[];
  obj: Object;
}

export interface Metric {
  value: string;
  viewValue: string;
  unit: string[];
}


export interface ActiveTcb {
  value: string;
  enabled: boolean;
}

@Component({
  selector: 'app-blueprints-e-stepper',
  templateUrl: './blueprints-e-stepper.component.html',
  styleUrls: ['./blueprints-e-stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]

})

export class BlueprintsEStepperComponent implements OnInit {


  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  isLinear = true;
  currentStep = 0;

  invalidFormula: boolean[] = [];
  isRegularExpression = true;
  selectedSite: string;
  selectedSites: any;
  selectedVsb: string;
  deploymentType: string;
  expBlueprintName: string;
  selectedCbs: string[] = [];
  uploadedNsdName: string;
  parameterNames: string[] = [];
  metricNames: string[] = [];
  kpiNames: string[] = [];
  selectedTcbs: string[] = [];
  interSite:boolean;
  showSiteNotinterMode:boolean;
  showSiteinterMode:boolean;
  nsdFiles:any;

  sites: Site[] = [
    {value: 'ITALY_TURIN', viewValue: 'Turin, Italy'},
    {value: 'GREECE_ATHENS', viewValue: 'Athens, Greece'},
    {value: 'SPAIN_5TONIC', viewValue: 'Madrid, Spain'},
    {value: 'FRANCE_CHATILLON', viewValue: 'Chatillon, France'},
    {value: 'FRANCE_RENNES', viewValue: 'Rennes, France'},
    {value: 'FRANCE_SACLAY', viewValue: 'Saclay, France'},
    {value: 'FRANCE_SOPHIA_ANTIPOLIS', viewValue: 'Sophia Antipolis, France'},
    {value: 'FRANCE_LANNION', viewValue: 'Lannion, France'},
    {value: 'ITALY_5GROWTH_COMAU', viewValue: '5G-Growth, Comau, Italy'},
    {value: 'SPAIN_5GROWTH_INNOVALIA', viewValue: '5G-Growth, Innovalia, Spain'}
  ];


  deployTypes: String[] = [
    "ON_DEMAND",
    "STATIC"
  ];

  metricTypes: Metric[] = [
    {value: 'USER_DATA_RATE_DOWNLINK', viewValue: 'USER_DATA_RATE_DOWNLINK', unit: ["Mbps", "Gbps"]},
    {value: 'USER_DATA_RATE_UPLINK', viewValue: 'USER_DATA_RATE_UPLINK', unit: ["Mbps", "Gbps"]},
    {value: 'CAPACITY', viewValue: 'CAPACITY', unit: ['Mbit/s/m2']},
    {value: 'LATENCY_USERPLANE', viewValue: 'LATENCY_USERPLANE', unit: ['ms']},
    {value: 'LATENCY_CONTROLPLANE', viewValue: 'LATENCY_CONTROLPLANE', unit: ['ms']},
    {value: 'DEVICE_DENSITY', viewValue: 'DEVICE_DENSITY', unit: ['devices/km2']},
    {value: 'MOBILITY', viewValue: 'MOBILITY', unit: ['km/h']}
  ];

  filteredMetricTypes: string[] = [];
  selectedMetric: string[] = [];

  graphTypes: String[] = [
    "LINE",
    "PIE",
    "COUNTER",
    "GAUGE"
  ];

  collectionTypes: String[] = [
    "CUMULATIVE",
    "DELTA",
    "GAUGE"
  ];

  nsdObj: Object;

  dfs: String[] = [];
  allVsbsElem:any;
  instLevels: String[] = [];
  allVsb:any;
  translationParams: String[] = [];
  bluePrintsAssosiate = [];
  compatibleSites:any;
  vsbs: Blueprint[] = [];
  ctxbs: Blueprint[] = [];
  tcbs: Blueprint[] = [];
  selectedSiteArr=[];
  //nsdArr=[];
  items: FormArray;
  metric_items: FormArray;
  kpi_items: FormArray;
  zeroFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  nsdArr: any;
  nsdArrMandatory:any;
  nsdListMap : Map<string, any> = new Map<string, any>();
  activeTestsCases: ActiveTcb[] = [];
  selectedContexts: Map<string, string> = new Map<string, string>();;

  constructor(private _formBuilder: FormBuilder,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsCtxService: BlueprintsEcService,
    private blueprintsTcService: BlueprintsTcService,
    private blueprintsExpService: BlueprintsExpService,
    private formulaCheckService: FormulaCheckService,
    private blueprintsEComponent: BlueprintsEComponent,
    private nsdsService: NsdsService,
    private authService: AuthService
    ) {
  }

  myControl = new FormControl();
  filteredOptions: Observable<any>;
  vsbName:any;
  ngOnInit() {
    this.selectedSites=[];
    this.interSite=false;
    this.showSiteNotinterMode=false;
    this.showSiteinterMode=false;
    this.getAllVsBlueprints();
    this.getVsBlueprints();
    this.getCtxBlueprints();
    this.getTcBlueprints();

    this.zeroFormGroup = this._formBuilder.group({
      bpIdCtrl: ['', Validators.required],
      bpNameCtrl: ['', Validators.required],
      bpVersionCtrl: ['', Validators.required],
      bpDescriptionCtrl: [''],
      deploymentTypeCtrl: ['', Validators.required]
    });
    this.firstFormGroup = this._formBuilder.group({
      //selectSiteCtrl: ['', Validators.required],
      selectVsbCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      selectCbsCtrl: ['', Validators.required],
      selectNoCbsCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      uploadNsdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      nsdIdCtrl: ['', Validators.required],
      nsdVersionCtrl: ['', Validators.required],
      nsFlavourIdCtrl: ['', Validators.required],
      nsInstLevelIdCtrl: ['', Validators.required],
      items: this._formBuilder.array([])
    });
    this.fifthFormGroup = this._formBuilder.group({
      metric_items: this._formBuilder.array([this.createMetricItem()]),
      kpi_items: this._formBuilder.array([this.createKPIItem()])
    });
    this.sixthFormGroup = this._formBuilder.group({
      selectTcbsCtrl: ['', Validators.required]
    });

  }

  private _filter(value: string): Blueprint[] {
    const filterValue = value.toLowerCase();
    return this.vsbs.filter(option =>
      option.viewValue.toLowerCase().includes(filterValue)
    );


  }

  validateFormula(event: any, index){
    this.invalidFormula[index] = false;
    if (event.target.value === undefined || event.target.value === '') {
      this.invalidFormula[index] = false;
    } else {
      this.formulaCheckService.validateFormula(event.target.value).subscribe((formulaCheckInfo: FormulaCheckInfo) => {
        if (!formulaCheckInfo.formula) {
           this.invalidFormula[index] = true;
        } else {
          this.invalidFormula[index] = false;
        }
        this.isRegularExpression = this.invalidFormula.every(function (e) {
          return e === false;
        });
      });
    }

  }

  showErrorMessage(index){
    return this.invalidFormula[index];
  }

  createItem(): FormGroup {
    return this._formBuilder.group({
      parameterId: '',
      minValue: '',
      maxValue: ''
    });
  }

  createMetricItem(): FormGroup {
    return this._formBuilder.group({
      iMetricType: '',
      interval: '',
      metricCollectionType: '',
      metricId: '',
      metricGraphType: '',
      name: '',
      unit: '',
      metricSelectSite:''
    });
  }

  selectedIndex = 0;

  createKPIItem(): FormGroup {
    return this._formBuilder.group({
      formula: '',
      interval: '',
      metricIds: '',
      kpiId: '',
      kpiGraphType:'',
      name: '',
      unit: ''
    });
  }


  goToStepIndex(index: number) {
    this.stepper.selectedIndex = index;
  }

  onStepChanged(event) {
      this.currentStep = event.selectedIndex;
  }

  disableCtxb($event){
    if ($event.source.checked){
      this.secondFormGroup.controls['selectCbsCtrl'].disable();
    } else {
      this.secondFormGroup.controls['selectCbsCtrl'].enable();
    }
  }


  addMetricItem(): void {
    this.metric_items = this.fifthFormGroup.get('metric_items') as FormArray;
    this.metric_items.push(this.createMetricItem());
  }

  removeMetricItem() {
    this.metric_items = this.fifthFormGroup.get('metric_items') as FormArray;
    this.metric_items.removeAt(this.metric_items.length - 1);
  }

  addKPIItem(): void {
    this.kpi_items = this.fifthFormGroup.get('kpi_items') as FormArray;
    this.kpi_items.push(this.createKPIItem());
  }

  removeKPIItem() {
    this.kpi_items = this.fifthFormGroup.get('kpi_items') as FormArray;
    this.kpi_items.removeAt(this.kpi_items.length - 1);
  }

  onDeploymentTypeSelected(event: any){
    this.deploymentType = event.value;
    var staticType = document.getElementById("staticType")
    var onDemandType = document.getElementById("onDemandType")
    var staticTypeBack = document.getElementById("staticTypeBack")
    var onDemandTypeBack = document.getElementById("onDemandTypeBack")

    if(event.value === 'STATIC'){
      staticType.style.display = 'inline';
      onDemandType.style.display = 'none';
      staticTypeBack.style.display = 'inline';
      onDemandTypeBack.style.display = 'none';
    } else {
      staticType.style.display = 'none';
      onDemandType.style.display = 'inline';
      staticTypeBack.style.display = 'none';
      onDemandTypeBack.style.display = 'inline';
    }
  }

  onSiteSelected(event: any,associatedVsbId) {

    this.selectedSite = event.value;
    //this.selectedSiteArr[associatedVsbId]=this.selectedSite;
}

  onClickSecondNext(){
    Object.keys(this.selectedSiteArr).forEach(e =>  this.selectedSites.push(this.selectedSiteArr[e]));

  }
  onVsbSelected(event: any,value) {
    this.selectedSite="";
    this.selectedVsb = value;
    for(var i = 0; i < this.vsbs.length; i++){
      if(this.vsbs[i]['obj']['blueprintId'] === this.selectedVsb){
        if(this.vsbs[i]['obj']['interSite'] !== undefined && this.vsbs[i]['obj']['interSite'] === true){
          this.interSite=true;
          this.showSiteinterMode=true;
          this.showSiteNotinterMode=false;
          this.bluePrintsAssosiate=this.vsbs[i]['obj']['atomicComponents'];
          for(var bl of this.bluePrintsAssosiate){
            if(!this.selectedSites.includes(bl['compatibleSite'])){
              this.selectedSites.push(bl['compatibleSite']);
            }
            this.selectedSiteArr[bl['associatedVsbId']]=bl['compatibleSite'];
          }

      }
      else{
        this.bluePrintsAssosiate=this.vsbs[i]['obj']['compatibleSites'];
        this.selectedSites=this.vsbs[i]['obj']['compatibleSites'];
        this.showSiteNotinterMode=true;
        this.interSite=false;
        this.showSiteinterMode=false;
      }
      if(this.vsbs[i]['obj']['parameters'] !== undefined){
        for (var j = 0; j < this.vsbs[i]['obj']['parameters'].length; j++) {
          this.translationParams.push(this.vsbs[i]['obj']['parameters'][j]['parameterId']);
          this.items = this.fourthFormGroup.get('items') as FormArray;
          this.items.push(this.createItem());
        }
      }
      }


    }
    // for (var i = 0; i < this.vsbs.length; i ++) {
    //   if (this.vsbs[i]['obj']['blueprintId'] == event.value) {

    //     if(this.vsbs[i]['obj']['parameters'] !== undefined){
    //       for (var j = 0; j < this.vsbs[i]['obj']['parameters'].length; j++) {
    //         this.translationParams.push(this.vsbs[i]['obj']['parameters'][j]['parameterId']);
    //         this.items = this.fourthFormGroup.get('items') as FormArray;
    //         this.items.push(this.createItem());
    //       }
    //     }
    //   }
    // }
  }


  verifyForm(step: number){
    if(step == 0){
      if(this.zeroFormGroup.valid){
        alert("ok");
      }
    }
  }
  onNameGiven(event: any) {
    //console.log(event);
    this.expBlueprintName = event.target.value;
  }

  onSelectedCb(event: any, cb: string, vsbId: any) {
    if(event.checked){
      console.log(event.source);
      this.secondFormGroup.controls['selectNoCbsCtrl'].disable();
      if(!this.selectedCbs.includes(event.source.value)){
        this.selectedCbs.push(event.source.value);
        if (!this.interSite){
          for (var i = 0; i < this.ctxbs.length; i ++) {
            if (this.ctxbs[i]['obj']['blueprintId'] == event.source.value) {
              if (this.ctxbs[i]['obj']['parameters'] !== undefined){
                for (var j = 0; j < this.ctxbs[i]['obj']['parameters'].length; j++) {
                  this.items = this.fourthFormGroup.get('items') as FormArray;
                  this.items.push(this.createItem());
                  this.translationParams.push(this.ctxbs[i]['obj']['parameters'][j]['parameterId']);
                }
              }
            }
          }
        } else {
          this.selectedContexts[cb] = vsbId;
        }
      }
    }else{
      this.secondFormGroup.controls['selectNoCbsCtrl'].enable();
      const index: number = this.selectedCbs.indexOf(event.source.value);
      if (index !== -1) {
          this.selectedCbs.splice(index, 1);
      }
      if (this.selectedContexts.hasOwnProperty(cb)) {
          delete this.selectedContexts[cb];
      }
    }
    console.log("CB: " + JSON.stringify(this.selectedContexts));
  }

  onUploadedNsd(event: any, nsds: File[], vsbId ,mode) {
    this.uploadedNsdName = event.target.files[0].name;
    this.nsdArr=[];
    let promises = [];

    for (let nsd of nsds) {
      if(nsd.type=='application/json' && nsd.name.includes('json')){

        let nsdPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(nsd);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(nsdPromise);
      }else{
        this.authService.log(`the file is not json`, 'FAILED', false);
        (<HTMLInputElement> document.getElementById("nsdNext")).disabled = true;

      }
    }
  if(promises.length > 0){
    Promise.all(promises).then(fileContents => {
        this.nsdObj = JSON.parse(fileContents[0]);
        if(mode=="optional"){
          this.nsdArr.push(this.nsdObj);
        }
        if(vsbId!=null){
          this.nsdListMap.set(String(vsbId), this.nsdArr[0]);

        }
        if(mode=="mandatory"){
          this.nsdArrMandatory=this.nsdObj;
        }
        this.fourthFormGroup.get('nsdIdCtrl').setValue(this.nsdObj['nsdIdentifier']);
        this.fourthFormGroup.get('nsdVersionCtrl').setValue(this.nsdObj['version']);

        this.dfs = this.nsdObj['nsDf'];
        /*
        this.nsdsService.validateNsDescriptor(this.nsdObj)
        .subscribe(res => {
          if(res===undefined){
            (<HTMLInputElement> document.getElementById("nsdNext")).disabled = true;
          }else{
            (<HTMLInputElement> document.getElementById("nsdNext")).disabled = false;

          }
        });
        */
        //this.fourthFormGroup.get('nsFlavourIdCtrl').setValue(nsdObj['nsDf'][0]['nsDfId']);
        //this.fourthFormGroup.get('nsInstLevelIdCtrl').setValue(nsdObj['nsDf'][0]['nsInstantiationLevel'][0]['nsLevelId']);
    });
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

  onNsInstLevelSelected(event:any) {
    var selectedInstLevel = event.value;

    for (var i = 0; i < this.instLevels.length; i++) {
      if (this.instLevels[i]['nsLevelId'] == selectedInstLevel) {

      }
    }
  }

  onParameterGiven(event: any) {
    //console.log(event);
    this.parameterNames.push(event.value);
  }

  onMetricGiven(event: any) {
    //console.log(event);
    this.metricNames.push(event.target.value);
  }

  onKPIGiven(event: any) {
    //console.log(event);
    this.kpiNames.push(event.target.value);
  }

  onSelectedTcbs(event: any, tcb: any) {
    //console.log(tcb);
    this.selectedTcbs = [];
    for (let i = 0; i < this.activeTestsCases.length; i++){
      if(this.activeTestsCases[i].value === tcb){
        if (event.checked){
          this.activeTestsCases[i].enabled = true;
        } else {
          this.activeTestsCases[i].enabled = false;
        }
      }
      if (this.activeTestsCases[i].enabled === true){
        this.selectedTcbs.push(this.activeTestsCases[i].value);
      }
     // console.log(this.selectedTcbs);
    }

  }

  getVsBlueprints() {
    this.vsbName=[];
    this.blueprintsVsService.getVsBlueprints().subscribe((vsBlueprintInfos: VsBlueprintInfo[]) =>
      {
        for (var i = 0; i < vsBlueprintInfos.length; i++) {
          this.vsbs.push({value: vsBlueprintInfos[i]['vsBlueprintId'], viewValue: vsBlueprintInfos[i]['vsBlueprint']['name'], sites: vsBlueprintInfos[i]['vsBlueprint']['compatibleSites'], obj: vsBlueprintInfos[i]['vsBlueprint']});
          this.vsbName.push(vsBlueprintInfos[i]['vsBlueprint']['name']);
        }

        this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
      });
  }

  getAllVsBlueprints() {
    return this.vsbs;

  }
  filterVsbsInSite(){
    return this.vsbs.filter(x => x.sites.indexOf(this.selectedSite) >= 0);
  }

  getFilteredMetricValues(index){
    var finto: string[] =  [];
    finto.push("Gbps");
    if (this.selectedMetric === undefined || this.selectedMetric === [] || this.selectedMetric.length <= index){
      return finto;
    } else {
      var metricsFiltered = this.metricTypes.filter(x => x.value.indexOf(this.selectedMetric[index]) >= 0);
      return metricsFiltered[0].unit;
    }

    }

  getCtxBlueprints() {
    this.blueprintsCtxService.getCtxBlueprints().subscribe((ctxBlueprintInfos: CtxBlueprintInfo[]) =>
      {
        for (var i = 0; i < ctxBlueprintInfos.length; i++) {
          this.ctxbs.push({value: ctxBlueprintInfos[i]['ctxBlueprintId'], viewValue: ctxBlueprintInfos[i]['ctxBlueprint']['description'], sites: ctxBlueprintInfos[i]['ctxBlueprint']['compatibleSites'], obj: ctxBlueprintInfos[i]['ctxBlueprint']});
        }
      });
  }

  filterCtxbsInSite(site){
    if(site==null){
      site=this.selectedSite;
    }
    return this.ctxbs.filter(x => x.sites.indexOf(site) >= 0);
  }

  getTcBlueprints() {
    this.blueprintsTcService.getTcBlueprints().subscribe((tcBlueprintInfos: TcBlueprintInfo[]) =>
      {
        for (var i = 0; i < tcBlueprintInfos.length; i++) {
          this.activeTestsCases.push({value: tcBlueprintInfos[i]['testCaseBlueprintId'], enabled: false});
          this.tcbs.push({value: tcBlueprintInfos[i]['testCaseBlueprintId'], viewValue: tcBlueprintInfos[i]['testCaseBlueprint']['description'], sites: tcBlueprintInfos[i]['testCaseBlueprint']['compatibleSites'], obj: tcBlueprintInfos[i]['testCaseBlueprint']});
        }
      });
  }

  filterTcbsInSite(){
    return this.tcbs.filter(x => x.sites.indexOf(this.selectedSite) >= 0);
  }

  updateUnits(event, index){
    this.selectedMetric[index] = event.value;
  }

  createOnBoardExpBlueprintRequest(nsds: File[]) {

    var onBoardExpRequest = JSON.parse('{}');


  //  console.log("fffffffffff",JSON.stringify(jsonObject))

    if (this.deploymentType !== "STATIC"){
      let jsonObject = {};
      this.nsdListMap.forEach((value, key) => {
          jsonObject[key] = value
      });


      onBoardExpRequest['enhancedVsbs']= jsonObject;

      onBoardExpRequest['nsds'] = [];

      onBoardExpRequest['translationRules'] = [];
      onBoardExpRequest['contextComponent'] = this.selectedContexts;
    }


    var expBlueprint = JSON.parse('{}');

    let promises = [];


    if (this.deploymentType !== "STATIC"){
      onBoardExpRequest['nsds'].push(this.nsdArrMandatory);
  /*
        for (let nsd of this.nsdFiles) {
          let nsdPromise = new Promise(resolve => {
              let reader = new FileReader();
              reader.readAsText(nsd);
              reader.onload = () => resolve(reader.result);
          });
          promises.push(nsdPromise);
      }
      */
  }

    Promise.all(promises).then(fileContents => {
      var blueprintId = this.zeroFormGroup.get('bpIdCtrl').value;
       var blueprintName = this.zeroFormGroup.get('bpNameCtrl').value;
       var bluepritnVersion = this.zeroFormGroup.get('bpVersionCtrl').value;
       var blueprintDesc = this.zeroFormGroup.get('bpDescriptionCtrl').value;

      if (this.deploymentType !== "STATIC"){
        /*
      for (var i = 0; i < fileContents.length; i++) {
        onBoardExpRequest['nsds'].push(JSON.parse(fileContents[i]));
        }
        */


        //console.log(this.translationParams);
        if (this.translationParams !== []){
          var translationRule = JSON.parse('{}');
          var nsdId = this.fourthFormGroup.get('nsdIdCtrl').value;
          var nsdVersion = this.fourthFormGroup.get('nsdVersionCtrl').value;
          var nsFlavourId = this.fourthFormGroup.get('nsFlavourIdCtrl').value;
          var nsInstLevel = this.fourthFormGroup.get('nsInstLevelIdCtrl').value;
          //translationRule['blueprintId'] = blueprintId;
          translationRule['nsdId'] = nsdId;
          translationRule['nsdVersion'] = nsdVersion;
          translationRule['nsFlavourId'] = nsFlavourId;
          translationRule['nsInstantiationLevelId'] = nsInstLevel;

          var paramsRows = this.fourthFormGroup.controls.items as FormArray;
          var controls = paramsRows.controls;
          var paramsObj = [];

          for (var j = 0; j < controls.length; j++) {
            paramsObj.push(controls[j].value);
          }
          translationRule['input'] = paramsObj;
          onBoardExpRequest.translationRules.push(translationRule);
        }
      }





        // expBlueprint['expBlueprintId'] = blueprintId;
        expBlueprint['description'] = blueprintDesc;

        expBlueprint['name'] = blueprintName;
        expBlueprint['version'] = bluepritnVersion;

        expBlueprint['vsBlueprintId'] = this.selectedVsb;
        expBlueprint['ctxBlueprintIds'] = this.selectedCbs;
        expBlueprint['tcBlueprintIds'] = this.selectedTcbs;
        expBlueprint['sites']=this.selectedSites;
        expBlueprint['deploymentType'] = this.zeroFormGroup.get('deploymentTypeCtrl').value;


        var metrics = this.fifthFormGroup.controls.metric_items as FormArray;
        var metric_controls = metrics.controls;
        var metricsObj = [];

        for (var j = 0; j < metric_controls.length; j++) {
          var newMetric = JSON.parse('{}');
          if(metric_controls[j].value['iMetricType'] !== ''){
            newMetric['iMetricType'] = metric_controls[j].value['iMetricType'];
            newMetric['interval'] = metric_controls[j].value['interval'];
            newMetric['metricCollectionType'] = metric_controls[j].value['metricCollectionType'];
            newMetric['metricGraphType'] = metric_controls[j].value['metricGraphType'];
            newMetric['targetSite'] = metric_controls[j].value['metricSelectSite'];
            newMetric['metricId'] = metric_controls[j].value['metricId'];
            newMetric['name'] = metric_controls[j].value['name'];
            newMetric['unit'] = metric_controls[j].value['unit'];
            metricsObj.push(newMetric);
          }
        }
          expBlueprint['metrics'] = metricsObj;

        var kpis = this.fifthFormGroup.controls.kpi_items as FormArray;
        var kpi_controls = kpis.controls;
        var kpisObj = [];

        for (var j = 0; j < kpi_controls.length; j++) {
          var temp = kpi_controls[j].value;
          if (temp['kpiId'] !== '') {
            var mIds = temp['metricIds'].split(',');

            var newKpiObj = JSON.parse('{}');
            newKpiObj['formula'] = temp['formula'];
            newKpiObj['interval'] = temp['interval'];
            newKpiObj['name'] = temp['name'];
            newKpiObj['kpiGraphType'] = temp['kpiGraphType'];
            newKpiObj['kpiId'] = temp['kpiId'];
            newKpiObj['unit'] = temp['unit'];
            newKpiObj['metricIds'] = [];
            for (var h = 0; h < mIds.length; h++) {
              newKpiObj['metricIds'].push(mIds[h].trim());
            }
            kpisObj.push(newKpiObj);
          }
       }
          expBlueprint['kpis'] = kpisObj;

        onBoardExpRequest['expBlueprint'] = expBlueprint;

       // console.log('onBoardExpRequest: ' + JSON.stringify(onBoardExpRequest, null, 4));




      this.blueprintsExpService.postExpBlueprint(onBoardExpRequest)
        .subscribe(expBlueprintId => {
         // console.log("EXP Blueprint with id " + expBlueprintId);

          this.blueprintsEComponent.selectedIndex = 0;
          this.zeroFormGroup.reset();
          this.firstFormGroup.reset();
          this.secondFormGroup.reset();
          this.thirdFormGroup.reset();
          this.fourthFormGroup.reset();
          this.fifthFormGroup.reset();
          this.sixthFormGroup.reset();
          this.blueprintsEComponent.getEBlueprints();

      });
    });
  }
}
