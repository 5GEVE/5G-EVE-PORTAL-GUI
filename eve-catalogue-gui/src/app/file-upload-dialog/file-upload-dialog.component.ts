import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {

  problem: string;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
      this.problem = data.problem;
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
