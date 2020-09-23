import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../nfv-ns/nfv-ns.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dump } from 'js-yaml';

@Component({
  selector: 'app-nfv-ns-dialog',
  templateUrl: './nfv-ns-dialog.component.html',
  styleUrls: ['./nfv-ns-dialog.component.css']
})
export class NfvNsDialogComponent implements OnInit {

  nsd: string;

  constructor(public dialogRef: MatDialogRef<NfvNsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.nsd = dump(this.data, {
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
