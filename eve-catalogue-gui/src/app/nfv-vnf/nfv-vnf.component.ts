import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NfvVnfDataSource } from './nfv-vnf-datasource';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { parse } from 'js-yaml';
import { VnfdsService } from '../vnfds.service';
import { VnfPkgInfo } from './vnf-pkg-info';


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

  constructor(private vnfdsService: VnfdsService,
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
        console.log(vnfDescriptor);
      });
  }
}
