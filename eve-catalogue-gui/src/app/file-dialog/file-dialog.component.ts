import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css']
})
export class FileDialogComponent implements OnInit {

  filename: string;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<FileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.filename = data.filename;
      this.action = data.action
    }

  ngOnInit(): void {
  } 

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmSelection() {
    this.dialogRef.close(true);
    //this.dialogRef.close(this.downloadFileForm.get('selectedStatus').value);
  }

}
