import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../nfv-vnf/nfv-vnf.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dump } from 'js-yaml';

@Component({
  selector: 'app-nfv-vnf-dialog',
  templateUrl: './nfv-vnf-dialog.component.html',
  styleUrls: ['./nfv-vnf-dialog.component.css']
})
export class NfvVnfDialogComponent implements OnInit {

  vnfd: string;

  constructor(public dialogRef: MatDialogRef<NfvVnfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.vnfd = dump(this.data, {
        indent: 4,
        styles: {
        '!!int'  : 'decimal',
        '!!null' : 'camelcase'
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
