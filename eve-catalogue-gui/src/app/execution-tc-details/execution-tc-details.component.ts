import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DescriptorsExpService } from '../descriptors-exp.service';
import { ExpDescriptorInfo } from '../descriptors-e/exp-descriptor-info';
import { TcBlueprintInfo } from '../blueprints-components/blueprints-tc/tc-blueprint-info';
import { TcDescriptorInfo } from '../descriptors-tc/tc-descriptor-info';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { DescriptorsTcService } from '../descriptors-tc.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ExperimentsService } from '../experiments.service';
import { Router } from '@angular/router';
import { ExperimentsComponent } from '../experiments/experiments.component';

export interface ActiveTestCases {
  tcDescriptor: TcDescriptorInfo;
  enabled: boolean;
}

@Component({
  selector: 'app-execution-tc-details',
  templateUrl: './execution-tc-details.component.html',
  styleUrls: ['./execution-tc-details.component.css']
})
export class ExecutionTcDetailsComponent implements OnInit {

  expId: string;
  expName: string;
  expDid: string;

  experimentDescriptor: ExpDescriptorInfo;

  testCaseBlueprints: TcBlueprintInfo[] = [];
  testCaseDescriptors: TcDescriptorInfo[] = [];

  activeTestsCasesList: TcDescriptorInfo[] = [];
  isSelected: boolean[] = [];

  disabled = true;

  userParametersFormGroup: FormGroup;


  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor( @Inject(DOCUMENT) private document,
               private experimentsComponent: ExperimentsComponent,
               private _formBuilder: FormBuilder,
               private router: Router,
               private experimentsService: ExperimentsService,
               private descriptorsExpService: DescriptorsExpService,
               private tcBlueprintService: BlueprintsTcService,
               private tcDescriptorService: DescriptorsTcService
  ) { }




  ngOnInit() {
    this.expId = localStorage.getItem('expId');
    this.expName = localStorage.getItem('expName');
    this.expDid = localStorage.getItem('expDid');
    this.getData(this.expDid);
    this.userParametersFormGroup = this._formBuilder.group({

    });


  }


  getData(expDid: string){
    this.descriptorsExpService.getExpDescriptor(expDid).subscribe(expDescriptorInfo => {
      this.tcBlueprintService.getTcBlueprints().subscribe((tcBlueprintInfos: TcBlueprintInfo[]) => {
        this.tcDescriptorService.getTcDescriptors().subscribe((tcDescriptorsInfos: TcDescriptorInfo[]) => {
          this.experimentDescriptor = expDescriptorInfo;
          this.testCaseBlueprints = tcBlueprintInfos;
          this.testCaseDescriptors = tcDescriptorsInfos;
          this.createTcList();
        });
      });
    });
  }


  changeAvailability(event: any, index: number){
    if (event.source.checked) {
      this.isSelected[index] = true;
    } else {
      this.isSelected[index] = false;
    }
    this.disabled = this.checkValidity();
  }

  checkValidity(){
    for (let i = 0; i < this.isSelected.length; i++){
      if (this.isSelected[i]) {
        return false;
      }
    }
    return true;
  }

  createTcList() {
    for (let i = 0; i < this.experimentDescriptor.testCaseDescriptorIds.length; i++){
      for (let j = 0; j < this.testCaseDescriptors.length; j ++) {
        this.isSelected[j] = false;
        for (let k = 0; k < this.testCaseBlueprints.length; k++){
          if (this.experimentDescriptor.testCaseDescriptorIds[i] === this.testCaseDescriptors[j].testCaseDescriptorId &&
              this.testCaseBlueprints[k].testCaseBlueprintId === this.testCaseDescriptors[j].testCaseBlueprintId){
                this.testCaseDescriptors[j].name = this.testCaseBlueprints[k].name;
                this.activeTestsCasesList.push(this.testCaseDescriptors[j]);
          }
        }
      }
    }
    console.log("ListaCreata: ", this.activeTestsCasesList);
  }


  executeExperiment(){
    var tempTc = {};
    var testCaseDescriptorConfiguration = new Map();

    for(let i = 0; i < this.activeTestsCasesList.length; i++){
      if (this.isSelected[i]){

        let userParams = new Map(Object.entries(this.activeTestsCasesList[i].userParameters));
        let tempParameters = new Map();
        for (let key of userParams.keys()) {
          tempParameters[key] = this.document.getElementById(key).value;
          this.activeTestsCasesList[i].userParameters[key] = this.document.getElementById(key).value;
        }
        testCaseDescriptorConfiguration[this.activeTestsCasesList[i].testCaseDescriptorId] = tempParameters;
      }


    }
    tempTc['experimentId'] = localStorage.getItem('expId');
    tempTc['executionName'] = localStorage.getItem('expName');
    tempTc['testCaseDescriptorConfiguration'] = testCaseDescriptorConfiguration;
    console.log(JSON.stringify(tempTc));
    this.experimentsService.executeExperimentAction(tempTc, 'execute').subscribe(
          () => {
            this.experimentsComponent.getExperiments();
            this.router.navigate(['/experiments']);
          }
        );

  }
}
