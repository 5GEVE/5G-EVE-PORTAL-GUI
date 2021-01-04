import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ExperimentInfo } from './experiment-info';
import { DescriptorsExpService } from '../descriptors-exp.service';
import { ExperimentsService } from '../experiments.service';
import { Router } from '@angular/router';
import { ExperimentsMgmtDialogComponent } from '../experiments-mgmt-dialog/experiments-mgmt-dialog.component';
import { ExperimentsExecuteDialogComponent } from '../experiments-execute-dialog/experiments-execute-dialog.component';
import { ExperimentsResultsDialogComponent } from '../experiments-results-dialog/experiments-results-dialog.component';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { TcBlueprintInfo } from '../blueprints-components/blueprints-tc/tc-blueprint-info';
import { TcDescriptorInfo } from '../descriptors-tc/tc-descriptor-info';
import { DescriptorsTcService } from '../descriptors-tc.service';
import { ExpDescriptorInfo } from '../descriptors-e/exp-descriptor-info';

export interface ActiveTestCases {
  tcDescriptor: TcDescriptorInfo;
  enabled: boolean;
}

export interface DialogData {
  expId: string;
  expStatus: string;
  expExecutions: Object[];
}

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  selectedState :any;
  selectedSite:any;
  states: string[] = [
    "SCHEDULING",
    "ACCEPTED",
    "READY",
    "INSTANTIATING",
    "INSTANTIATED",
    "CONFIGURING",
    "RUNNING",
    "TERMINATING",
    "TERMINATED",
    "FAILED",
    "REFUSED",
    "ABORTED"
  ];

  sites: string[] = [
    "ITALY_TURIN",
    "SPAIN_5TONIC",
    "FRANCE_CHATILLON",
    "FRANCE_SACLAY",
    "FRANCE_RENNES",
    "FRANCE_SOPHIA_ANTIPOLIS",
    "FRANCE_LANNION",
    "GREECE_ATHENS",
    "ITALY_5GROWTH_COMAU",
    "SPAIN_5GROWTH_INNOVALIA"
  ];

  tableData: ExperimentInfo[] = [];

  testCaseBlueprints: TcBlueprintInfo[] = [];
  testCaseDescriptors: TcDescriptorInfo[] = [];
  activeTestsCasesList: ActiveTestCases[] = [];
  experimentDescriptor: ExpDescriptorInfo;


  dataSource = new MatTableDataSource(this.tableData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  idToExpdId: Map<string, Map<string, string>> = new Map();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['experimentId', 'experimentDescriptorId', 'sites', 'status', 'execStatus', 'buttons'];

  constructor(private router: Router,
    public dialog: MatDialog,
    private descriptorsExpService: DescriptorsExpService,
    private experimentsService: ExperimentsService,
    private tcBlueprintService: BlueprintsTcService,
    private tcDescriptorService: DescriptorsTcService
    ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getExperiments();
    this.getTcBlueprints();
    this.getTcDescriptors();

    //this.mapValuesToTcDescript
  }

  getTcBlueprints() {
    this.tcBlueprintService.getTcBlueprints().subscribe((tcBlueprintInfos: TcBlueprintInfo[]) =>
    {
      this.testCaseBlueprints = tcBlueprintInfos;
      //console.log(this.testCaseBlueprints);
    });
  }

  getTcDescriptors() {
    this.tcDescriptorService.getTcDescriptors().subscribe((tcDescriptorsInfos: TcDescriptorInfo[]) =>
    {
      this.testCaseDescriptors = tcDescriptorsInfos;
      //console.log(tcDescriptorsInfos);
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

  getExpDescriptor(expId: string, expDId: string) {
    this.descriptorsExpService.getExpDescriptor(expDId).subscribe(expDescriptorInfo => {
      this.experimentDescriptor = expDescriptorInfo;
      var names = this.idToExpdId.get(expId);
      names.set(expDId, expDescriptorInfo['name']);
      //console.log(expDescriptorInfo);
    });
  }

  viewExpDescriptor(expDId: string) {
    localStorage.setItem('expdId', expDId);

    this.router.navigate(["/descriptors_e_details"]);
  }

  viewExperiment(expId: string) {
    //console.log(expId);
    localStorage.setItem('expId', expId);

    this.router.navigate(["/experiments_details"]);
  }


  viewMetrics(expId: string) {
    //console.log(expId);
    localStorage.setItem('expId', expId);

    this.router.navigate(["/metrics_dashboard"]);
  }

  onStatusSelected(event: any) {
    var selectedState = event.value;
    this.dataSource.filter = selectedState.trim();
  }

  deleteExperiment(expId: string) {
    this.experimentsService.deleteExperiment(expId).subscribe(
      () => {this.getExperiments();}
    );
  }

  onSiteSelected(event: any) {
    var selectedSite = event.value;
    this.dataSource.filter = selectedSite.trim();
  }

  clearFilter() {
    this.dataSource.filter = '';
  }

  getRole() {
    return localStorage.getItem('role');
  }

  openMgmtDialog(expId: string, expStatus: string) {
    const dialogRef = this.dialog.open(ExperimentsMgmtDialogComponent, {
      width: '30%',
      data: {expId: expId, expStatus: expStatus, expExecutions: []}
    });

    dialogRef.afterClosed().subscribe(selectedStatus => {
      if (selectedStatus) {
        //console.log('Selected Status: ' + selectedStatus);
        var changeStatusRequest = {};
        changeStatusRequest['experimentId'] = expId;
        changeStatusRequest['status'] = selectedStatus;

        //console.log('changeStatusRequest: ' + JSON.stringify(changeStatusRequest, null, 4));

        this.experimentsService.changeExperimentStatus(changeStatusRequest).subscribe(
          () => {this.getExperiments();}
        );
      }
    });
  }

  openExecDialog(expId: string, expStatus: string, expDId: string) {

    // for (let i = 0; i < this.experimentDescriptor.testCaseDescriptorIds.length; i++){
    //   for (let j = 0; j < this.testCaseDescriptors.length; j ++){
    //       if (this.experimentDescriptor.testCaseDescriptorIds[i] === this.testCaseDescriptors[j].testCaseDescriptorId){
    //         var activeTC: ActiveTestCases = {'tcDescriptor': null, 'enabled': true};
    //         activeTC['tcDescriptor'] = this.testCaseDescriptors[j];
    //         activeTC['enabled'] = true;
    //         this.activeTestsCasesList.push(activeTC);
    //       }
    //   }
    // }
    // console.log("ListaCreata: ", this.activeTestsCasesList);

    const dialogRef = this.dialog.open(ExperimentsExecuteDialogComponent, {
      width: '30%',
      data: {expId: expId, expStatus: expStatus, expExecutions: []}
    });

    dialogRef.afterClosed().subscribe(formContent => {
      if (formContent) {
        //console.log('ExpDescriptor: ' + JSON.stringify(this.experimentDescriptor));
        //console.log('Selected Status: ' + selectedAction);
        var actionRequest = {};
        var actionRequested = formContent.get('selectedAction').value;
        actionRequest['experimentId'] = expId;
        actionRequest['executionName'] = formContent.get('executionName').value;
        //console.log('changeStatusRequest: ' + JSON.stringify(actionRequest, null, 4));
        localStorage.setItem('expId', expId);
        localStorage.setItem('expName', formContent.get('executionName').value);
        localStorage.setItem('expDid', expDId);
        if (formContent.get('selectedAction').value === 'execute') {
          this.router.navigate(['./execute_tc_details']);
        } else {
          this.experimentsService.executeExperimentAction(actionRequest, formContent.get('selectedAction').value).subscribe(
            () => {
              this.getExperiments();
            }
          );
        }


      }
    });
    this.activeTestsCasesList = [];
  }

  openResultsDialog(expId: string, expStatus: string, expExecutions: Object[]) {
    const dialogRef = this.dialog.open(ExperimentsResultsDialogComponent, {
      width: '30%',
      data: {expId: expId, expStatus: expStatus, expExecutions: expExecutions}
    });

    dialogRef.afterClosed().subscribe(selectedExecution => {
      if (selectedExecution) {
        //console.log('Selected Execution: ' + selectedExecution);

        var resultsUrl = '';
        for (var i = 0; i < expExecutions.length; i++){
          if (expExecutions[i]['executionId'] == selectedExecution) {
            resultsUrl = expExecutions[i]['reportUrl'];
          }
        }

        window.open(resultsUrl, "_blank");
      }
    });
  }
}
