import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TcBlueprintInfo } from './tc-blueprint-info';
import { BlueprintsTcDataSource } from './blueprints-tc-datasource';
import { BlueprintsTcService } from '../../blueprints-tc.service';
import { FormBuilder, FormArray, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { DescriptorsTcService } from '../../descriptors-tc.service';

@Component({
  selector: 'app-blueprints-tc',
  templateUrl: './blueprints-tc.component.html',
  styleUrls: ['./blueprints-tc.component.css']
})
export class BlueprintsTcComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TcBlueprintInfo>;
  dataSource: BlueprintsTcDataSource;
  tcBlueprintInfos: TcBlueprintInfo[] = [];
  idToTcdIds: Map<string, Map<string, string>> = new Map();

  user_items: FormArray;
  infra_items: FormArray;
  tcFormGroup: FormGroup;
  uploadFormGroup: FormGroup;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'version', 'description', /*'script',*/ 'user_params', 'infra_params',/* 'tcds',*/ 'buttons'];

  constructor(private _formBuilder: FormBuilder,
    private blueprintsTcService: BlueprintsTcService,
    private descriptorsTcService: DescriptorsTcService,
    private router: Router) { }

  ngOnInit() {

    this.tcFormGroup = this._formBuilder.group({
      description: [''],
      name: ['', Validators.required],
      version: ['', Validators.required],
      executionScript: ['', Validators.required],
      resetConfigScript: [''],
      configurationScript: [''],
      user_items: this._formBuilder.array([this.createUserItem()]),
      infra_items: this._formBuilder.array([this.createInfraItem()])
    });
    this.dataSource = new BlueprintsTcDataSource(this.tcBlueprintInfos);
    this.uploadFormGroup = this._formBuilder.group({
      tcbFileCtrl: ['', Validators.required]
    });
    this.getTcBlueprints();
  }

  createUserItem(): FormGroup {
    return this._formBuilder.group({
      userParamName: '',
      userParamValue: ''
    });
  }

  createInfraItem(): FormGroup {
    return this._formBuilder.group({
      infraParamName: '',
      infraParamValue: ''
    });
  }

  addUserItem(): void {
    this.user_items = this.tcFormGroup.get('user_items') as FormArray;
    this.user_items.push(this.createUserItem());
  }

  removeUserItem() {
    this.user_items = this.tcFormGroup.get('user_items') as FormArray;
    this.user_items.removeAt(this.user_items.length - 1);
  }

  addInfraItem(): void {
    this.infra_items = this.tcFormGroup.get('infra_items') as FormArray;
    this.infra_items.push(this.createInfraItem());
  }

  removeInfraItem() {
    this.infra_items = this.tcFormGroup.get('infra_items') as FormArray;
    this.infra_items.removeAt(this.infra_items.length - 1);
  }

  getTcBlueprints(): void {
    this.blueprintsTcService.getTcBlueprints().subscribe((tcBlueprintInfos: TcBlueprintInfo[]) =>
      {
        //console.log(tcBlueprintInfos);
        this.tcBlueprintInfos = tcBlueprintInfos;

        for (var i = 0; i < tcBlueprintInfos.length; i++) {
          this.idToTcdIds.set(tcBlueprintInfos[i]['testCaseBlueprintId'], new Map());
          for (var j = 0; j < tcBlueprintInfos[i]['activeTcdId'].length; j++) {
            this.getTcDescriptor(tcBlueprintInfos[i]['testCaseBlueprintId'], tcBlueprintInfos[i]['activeTcdId'][j]);
          }
        }
        this.dataSource = new BlueprintsTcDataSource(this.tcBlueprintInfos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
  }

  getTcDescriptor(tcbId: string, tcdId: string) {
    this.descriptorsTcService.getTcDescriptor(tcdId).subscribe(tcDescriptorInfo => {
      var names = this.idToTcdIds.get(tcbId);
      names.set(tcdId, tcDescriptorInfo['name']);
    })
  }

  viewTcDescriptor(tcdId: string) {
    //console.log(tcdId);
    localStorage.setItem('tcdId', tcdId);

    this.router.navigate(["/descriptors_tc"]);
  }

  deleteTcBlueprint(tcBlueprintId: string) {
    //console.log(tcBlueprintId);
    this.blueprintsTcService.deleteTcBlueprint(tcBlueprintId).subscribe();
  }


  hideNextShowSubmit($event:any){
    var uploadProcedure = document.getElementById("uploadProcedure");
    var guidedProcedure = document.getElementById("guidedProcedure");
    if ($event.source.checked){
      uploadProcedure.style.display = 'inline';
      guidedProcedure.style.display = 'none';
    } else {
      guidedProcedure.style.display = 'inline';
      uploadProcedure.style.display = 'none';
    }

  }

  createTCBViaJSONFile(tcbs: File[]){
    if (tcbs.length > 0) {
      var tcb = tcbs[0];
      let promises = [];
      let tcbPromise = new Promise(resolve => {
          let reader = new FileReader();
          reader.readAsText(tcb);
          reader.onload = () => resolve(reader.result);
      });
      promises.push(tcbPromise);
      Promise.all(promises).then(fileContents => {
        var onBoardTcRequest = JSON.parse(fileContents[0]);

        this.blueprintsTcService.postTcBlueprint(onBoardTcRequest)
        .subscribe(tcBlueprintId => console.log("TC Blueprint with id " + tcBlueprintId));
      });
    }
  }

  createOnBoardTcBlueprintRequest() {
    if(! this.tcFormGroup.invalid){
      var onBoardTcRequest = JSON.parse('{}');
      var testCaseBlueprint = JSON.parse('{}');

      var description = this.tcFormGroup.get('description').value;
      var name = this.tcFormGroup.get('name').value;
      var executionScript = this.tcFormGroup.get('executionScript').value;
      var configurationScript = this.tcFormGroup.get('configurationScript').value;
      var resetConfigScript = this.tcFormGroup.get('resetConfigScript').value;
      var version = this.tcFormGroup.get('version').value;

      testCaseBlueprint['description'] = description;
      testCaseBlueprint['name'] = name;
      testCaseBlueprint['executionScript'] = executionScript;
      testCaseBlueprint['configurationScript'] = configurationScript;
      testCaseBlueprint['resetConfigScript'] = resetConfigScript;
      testCaseBlueprint['version'] = version;

      var userParams = this.tcFormGroup.controls.user_items as FormArray;
      var user_controls = userParams.controls;
      var userParamsMap = JSON.parse('{}');

      for (var j = 0; j < user_controls.length; j++) {
        //console.log(user_controls[j].value);
        if ((user_controls[j].value)['userParamName'] != "") {
          userParamsMap[(user_controls[j].value)['userParamName']] = (user_controls[j].value)['userParamValue'];
        }
      }

      testCaseBlueprint['userParameters'] = userParamsMap;

      var infraParams = this.tcFormGroup.controls.infra_items as FormArray;
      var infra_controls = infraParams.controls;
      var infraParamsMap = JSON.parse('{}');

      for (var j = 0; j < infra_controls.length; j++) {
        //console.log(infra_controls[j].value);
        if ((infra_controls[j].value)['infraParamName'] != "") {
          infraParamsMap[(infra_controls[j].value)['infraParamName']] = (infra_controls[j].value)['infraParamValue'];
        }
      }

      testCaseBlueprint['infrastructureParameters'] = infraParamsMap;

      onBoardTcRequest['testCaseBlueprint'] = testCaseBlueprint;

      console.log("OnboardTcRequest:" + JSON.stringify(onBoardTcRequest, null, 4));

      this.blueprintsTcService.postTcBlueprint(onBoardTcRequest)
      .subscribe(tcBlueprintId => console.log("TC Blueprint with id " + tcBlueprintId));
    }

  }
}