import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ExperimentsDetailsDataSource, ExperimentsDetailsItemKV } from './experiments-details.datasource';
import { ExperimentsService } from '../experiments.service';
import { ExperimentInfo } from '../experiments/experiment-info';
import { Execution } from '../experiments/execution';
import { SapInfo} from '../experiments/sapInfo';
import { ExpDescriptorInfo } from '../descriptors-e/exp-descriptor-info';
import { DescriptorsExpService } from '../descriptors-exp.service';



@Component({
  selector: 'app-experiments-details',
  templateUrl: './experiments-details.component.html',
  styleUrls: ['./experiments-details.component.css']
})
export class ExperimentsDetailsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<ExperimentsDetailsItemKV>;
  dataSource: ExperimentsDetailsDataSource;

  tableData: ExperimentsDetailsItemKV[] = [];

  experiment: ExperimentInfo;

  executions: Execution[];

  sapInfos: SapInfo[];

  cps: ExperimentsDetailsItemKV[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['key', 'value'];
  executionsColumns = ['name', 'id', 'state', 'reportUrl', 'tcr'];

  constructor(private experimentsService: ExperimentsService, private  descriptorsExpService: DescriptorsExpService) { }

  ngOnInit() {
    var expId = localStorage.getItem('expId');
    this.dataSource = new ExperimentsDetailsDataSource(this.tableData);
    this.getExperiment(expId);
  }

  getExperiment(expId: string) {
    this.experimentsService.getExperiment(expId, null).subscribe((experimentInfos: ExperimentInfo[]) => {
      this.descriptorsExpService.getExpDescriptors().subscribe((expDescriptorInfo: ExpDescriptorInfo[]) => {
//      console.log(experimentInfos);
      for (var i = 0; i < experimentInfos.length ; i++) {
        if (experimentInfos[i]['experimentId'] === expId){
          this.experiment = experimentInfos[i];

        }
      }
      this.tableData.push({key: "Name", value: [this.experiment.name]});
      this.tableData.push({key: "Id", value: [this.experiment.experimentId]});
      this.tableData.push({key: "Status", value: [this.experiment.status]});

      for(var i = 0; i < expDescriptorInfo.length; i++){
        if (this.experiment.experimentDescriptorId === expDescriptorInfo[i]['expDescriptorId']){
          this.tableData.push({key: "Experiment Descriptor", value: [expDescriptorInfo[i]['name']]});
        }
      }
      console.log(this.experiment.timeslot.startTime);
      this.tableData.push({key: "Target Sites", value: this.experiment.targetSites});
      this.tableData.push({key: "Target Use Case", value: [this.experiment.useCase]});
      if (this.getRole().indexOf('SITE_MANAGER') >= 0) {
        if(this.experiment.tenantId != null){this.tableData.push({key: "Tenant Id", value: [this.experiment.tenantId]});}
        if(this.experiment.lcTicketId != null){this.tableData.push({key: "Ticket Id", value: [this.experiment.lcTicketId]});}
        if(this.experiment.openTicketIds != null && this.experiment.openTicketIds.length > 0){this.tableData.push({key: "Open Ticket Ids", value: this.experiment.openTicketIds});}
      }
      var startDate = new Date(this.experiment.timeslot.startTime);
      //console.log(startDate.getUTCDate());
      //startDate.setUTCSeconds(parseInt(this.experiment.timeslot.startTime));
      //console.log(startDate);
      var stopDate = new Date(this.experiment.timeslot.stopTime);
      //stopDate.setUTCSeconds(parseInt(this.experiment.timeslot.stopTime));
      this.tableData.push({key: "Time Slot", value: ['Start Date: ' + startDate.toLocaleString(), 'Stop Date: ' + stopDate.toLocaleString()]});
      //this.tableData.push({key: "NFV Instance Id", value: [this.experiment.nfvNsInstanceId]});

      var values = [];
      if(this.experiment['sapInfo'] !== undefined){
        for (var i = 0 ; i < this.experiment['sapInfo'].length; i++){
          values.push(this.experiment['sapInfo'][i]['sapdId'] + " - "+ this.experiment['sapInfo'][i]['address']);
        }
      }
      this.tableData.push({key: "Sap Info", value: values});
      this.executions = this.experiment.executions;

      this.dataSource = new ExperimentsDetailsDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  });
  }

  getRole() {
    return localStorage.getItem('role');
  }

  openResultsDialog(reportUrl: string) {

        window.open(reportUrl, "_blank");
  }

}
