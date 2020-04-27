import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NfvNsDataSource } from './nfv-ns-datasource';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { parse } from 'js-yaml';
import { NsdsService } from '../nsds.service';
import { NsdInfo } from './nsd-info';


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

  constructor(private nsdsService: NsdsService,
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
        console.log(nsDescriptor);
      });
  }
}
