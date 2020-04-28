import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NfvNsDataSource } from './nfv-ns-datasource';
import { Router } from '@angular/router';
import { dump } from 'js-yaml';
import { NsdsService } from '../../nsds.service';
import { NsdInfo } from './nsd-info';
import { NfvNsDialogComponent } from '../nfv-ns-dialog/nfv-ns-dialog.component';
import { NfvNsGraphDialogComponent } from '../nfv-ns-graph-dialog/nfv-ns-graph-dialog.component';

export interface DialogData {
  descriptorId: string;
  descriptorContent: string;
}

@Component({
  selector: 'app-nfv-ns',
  templateUrl: './nfv-ns.component.html',
  styleUrls: ['./nfv-ns.component.css']
})
export class NfvNsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<NsdInfo>;
  dataSource: NfvNsDataSource;
  tableData: NsdInfo[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'version', 'provider', 'opstate', 'onstate', 'onstates', 'buttons'];

  constructor(private nsdsService: NsdsService, public dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {
    this.dataSource = new NfvNsDataSource(this.tableData);
    this.getNsdInfos();
  }

  getNsdInfos() {
    this.nsdsService.getNsdInfos().subscribe((nsdInfos: NsdInfo[]) =>
      {
        //console.log(nsdInfos);
        this.tableData = nsdInfos;

        this.dataSource = new NfvNsDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  viewNsDescriptor(nsdInfoId: string) {
    this.nsdsService.getNsDescriptor(nsdInfoId).subscribe((nsDescriptor: any) =>
      {
        //console.log(nsDescriptor);
        //console.log(dump(nsDescriptor, 4, null));
        const dialogRef = this.dialog.open(NfvNsDialogComponent, {
          width: '60%',
          data: {descriptorId: nsDescriptor['metadata']['descriptorId'], descriptorContent: nsDescriptor}
        });
      });
  }

  viewNsGraph(nsdInfoId: string) {
    this.nsdsService.getNsDescriptor(nsdInfoId).subscribe((nsDescriptor: any) =>
      {
        //console.log(nsDescriptor);
        //console.log(dump(nsDescriptor, 4, null));
        const dialogRef = this.dialog.open(NfvNsGraphDialogComponent, {
          width: '60%',
          data: {descriptorId: nsDescriptor['metadata']['descriptorId'], descriptorContent: nsDescriptor}
        });
      });
  }
}
