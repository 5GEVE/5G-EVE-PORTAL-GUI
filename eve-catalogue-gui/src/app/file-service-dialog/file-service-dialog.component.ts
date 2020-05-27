import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-file-service-dialog',
  templateUrl: './file-service-dialog.component.html',
  styleUrls: ['./file-service-dialog.component.css']
})
export class FileServiceDialogComponent implements OnInit {

  expMgmtForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FileServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: []) {}

  ngOnInit(): void {
    this.expMgmtForm = this._formBuilder.group({
      selectedStatus: ['', Validators.required]
    });
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    this.dialogRef.close(this.expMgmtForm.get('selectedStatus').value);
  }

}
