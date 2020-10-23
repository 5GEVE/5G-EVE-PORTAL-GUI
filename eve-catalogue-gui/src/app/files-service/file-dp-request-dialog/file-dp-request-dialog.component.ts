import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FilesService } from '../services/files.service';

@Component({
  selector: 'app-file-dp-request-dialog',
  templateUrl: './file-dp-request-dialog.component.html',
  styleUrls: ['./file-dp-request-dialog.component.css']
})
export class FileDpRequestDialogComponent implements OnInit {

  filename: string;
  owner: string;
  siteFacilities: [];

  createRequestForm: FormGroup;
  checkArray: FormArray;
  selectedSites: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<FileDpRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private filesService: FilesService,) {
      
      this.filename = data.filename;
      this.owner = data.owner;
      this.siteFacilities = data.siteFacilities;
    }

  ngOnInit(): void {
    this.createRequestForm = this.formBuilder.group({
      selectedSiteFacilities   : this.formBuilder.array([])
    });    
  } 

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.filesService.setSites(this.filename, this.selectedSites)
    .pipe()
    .subscribe(
      data => {
        this.dialogRef.close("CREATED");
      },
      error => {
        this.dialogRef.close("ERROR");
    });    
  }

  get f() { 
    return this.createRequestForm.controls; 
  }

  onCheckboxChange(e) {
    this.checkArray = this.createRequestForm.get('selectedSiteFacilities') as FormArray;
    
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
      this.selectedSites.push(e.target.value);
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          this.selectedSites = this.selectedSites.filter(r => r !== e.target.value);
          return;
        }
        i++;
      });
    }
  }
}
