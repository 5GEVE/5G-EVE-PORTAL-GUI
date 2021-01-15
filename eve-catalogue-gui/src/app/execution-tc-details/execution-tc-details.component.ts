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
import { MatTableDataSource } from '@angular/material/table';
import { ExperimentInfo } from '../experiments/experiment-info';


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
  perfDiag: string;

  experimentDescriptor: ExpDescriptorInfo;

  testCaseBlueprints: TcBlueprintInfo[] = [];
  testCaseDescriptors: TcDescriptorInfo[] = [];

  activeTestsCasesList: TcDescriptorInfo[] = [];
  isSelected: boolean[] = [];

  disabled = true;

  userParametersFormGroup: FormGroup;
  tableData: ExperimentInfo[]=[]
  dataSource = new MatTableDataSource(this.tableData);
  idToExpdId: Map<string, Map<string, string>> = new Map();

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor( @Inject(DOCUMENT) private document,
              // private experimentsComponent: ExperimentsComponent,
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
    this.perfDiag = localStorage.getItem('perfDiag');
    this.getData(this.expDid);
    this.userParametersFormGroup = this._formBuilder.group({

    });


  }
  getExpDescriptor(expId: string, expDId: string) {
    this.descriptorsExpService.getExpDescriptor(expDId).subscribe(expDescriptorInfo => {
      this.experimentDescriptor = expDescriptorInfo;
      var names = this.idToExpdId.get(expId);
      names.set(expDId, expDescriptorInfo['name']);
      console.log(expDescriptorInfo);
    });
  }
  getExperiments() {
    this.experimentsService.getExperiments().subscribe((experimentInfos: ExperimentInfo[]) =>
      {
        //console.log(expDescriptorsInfos);
        this.tableData = experimentInfos;

        for (var i = 0; i < experimentInfos.length; i ++) {
          this.idToExpdId.set(experimentInfos[i].experimentId, new Map<string, string>());
          this.getExpDescriptor(experimentInfos[i].experimentId, experimentInfos[i].experimentDescriptorId);
        }
        this.dataSource = new MatTableDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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
    // console.log(this.experimentDescriptor);
    for (let i = 0; i < this.experimentDescriptor.testCaseDescriptorIds.length; i++){
      for (let j = 0; j < this.testCaseDescriptors.length; j ++) {
        this.isSelected[j] = false;
        for (let k = 0; k < this.testCaseBlueprints.length; k++){
          console.log(this.experimentDescriptor.testCaseDescriptorIds[i] ,"===", this.testCaseDescriptors[j].testCaseDescriptorId)

          if (this.experimentDescriptor.testCaseDescriptorIds[i] === this.testCaseDescriptors[j].testCaseDescriptorId &&
              this.testCaseBlueprints[k].testCaseBlueprintId === this.testCaseDescriptors[j].testCaseBlueprintId) {
                this.testCaseDescriptors[j].name = this.testCaseBlueprints[k].name;
                this.activeTestsCasesList.push(this.testCaseDescriptors[j]);
          }
        }
      }
    }
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
    if(this.perfDiag === "true"){
      tempTc['perfDiag'] = true;
    }
    tempTc['testCaseDescriptorConfiguration'] = testCaseDescriptorConfiguration;

    //console.log(JSON.stringify(tempTc));
    this.experimentsService.executeExperimentAction(tempTc, 'execute').subscribe(

          () => {
            this.getExperiments();
            this.router.navigate(['/experiments']);
          }
        );

  }

}
