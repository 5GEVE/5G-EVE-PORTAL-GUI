import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NfvVnfDataSource } from './nfv-vnf-datasource';
import { Router } from '@angular/router';
import { dump } from 'js-yaml';
import { VnfdsService } from '../../vnfds.service';
import { VnfPkgInfo } from './vnf-pkg-info';
import { NfvVnfDialogComponent } from '../nfv-vnf-dialog/nfv-vnf-dialog.component';
import { NfvVnfGraphDialogComponent } from '../nfv-vnf-graph-dialog/nfv-vnf-graph-dialog.component';

export interface DialogData {
  descriptorId: string;
  descriptorContent: string;
}

@Component({
  selector: 'app-nfv-vnf',
  templateUrl: './nfv-vnf.component.html',
  styleUrls: ['./nfv-vnf.component.css']
})
export class NfvVnfComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<VnfPkgInfo>;
  dataSource: NfvVnfDataSource;
  tableData: VnfPkgInfo[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'version', 'provider', 'opstate', 'onstate', 'onstates', 'buttons'];

  constructor(private vnfdsService: VnfdsService, public dialog: MatDialog,
    private router: Router) {}

  ngOnInit() {
    this.dataSource = new NfvVnfDataSource(this.tableData);
    this.getVnfPkgInfos();
  }

  getVnfPkgInfos() {
    this.vnfdsService.getVnfPackageInfos().subscribe((vnfPkgInfos: VnfPkgInfo[]) =>
      {
        //console.log(vnfPkgInfos);
        this.tableData = vnfPkgInfos;

        this.dataSource = new NfvVnfDataSource(this.tableData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  viewVnfDescriptor(vnfPkgInfoId: string) {
    this.vnfdsService.getVnfDescriptor(vnfPkgInfoId).subscribe((vnfDescriptor: any) =>
      {
        //console.log(vnfDescriptor);
        //console.log(dump(vnfDescriptor, 4, null));
        const dialogRef = this.dialog.open(NfvVnfDialogComponent, {
          width: '60%',
          data: {descriptorId: vnfDescriptor['metadata']['descriptorId'], descriptorContent: vnfDescriptor}
        });
      });
  }

  viewVnfGraph(vnfPkgInfoId: string) {
    this.vnfdsService.getVnfDescriptor(vnfPkgInfoId).subscribe((vnfDescriptor: any) =>
      {
        //console.log(vnfDescriptor);
        //console.log(dump(vnfDescriptor, 4, null));
        const dialogRef = this.dialog.open(NfvVnfGraphDialogComponent, {
          width: '60%',
          data: {descriptorId: vnfDescriptor['metadata']['descriptorId'], descriptorContent: vnfDescriptor}
        });
      });
  }
}
