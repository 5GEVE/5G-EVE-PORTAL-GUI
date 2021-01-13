import { Blueprint } from './../blueprints-compnents/blueprints-e-stepper/blueprints-e-stepper.component';

import { Component, OnInit } from '@angular/core';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { NsdsService } from '../nsds.service';
import { EncService } from '../enc.service';

import { of } from 'rxjs';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  id:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Vertical Service Blueprint Schema',id:'vsb'},
  {name: 'Context Blueprint Schema',id:'ctx'},
  {name: 'Experiment Blueprint Schema',id:'exp'},
  {name: 'Test Case Blueprint Schema',id:'tcb'},
  {name: 'Network Service Descriptor Schema',id:'nsd'},
];

@Component({
  selector: 'app-support-tools-schemas',
  templateUrl: './support-tools-schemas.component.html',
  styleUrls: ['./support-tools-schemas.component.css']
})

export class SupportToolsSchemasComponent implements OnInit {
  selectedIndex = 0;
  displayedColumns = ['name','actions'];
  dataSource = ELEMENT_DATA;
  constructor(private router: Router,
    private blueprintsVsService: BlueprintsVsService,
    private blueprintsEcService: BlueprintsEcService,
    private blueprintsExpService: BlueprintsExpService,
    private blueprintsTcService: BlueprintsTcService,
    private nsdsService: NsdsService,private encService: EncService  ) { }

  ngOnInit() {
    if (localStorage.getItem('logged') != "true") {
      this.router.navigate(['/login']);
    }
  }


  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }


  fakeValidateUserData() {
    return of({
      userDate1: 1,
      userData2: 2
    });
  }

  dynamicDownloadJson(id) {
    if(id=='vsb'){
      this.encService.schemaVsBlueprint()
      .subscribe(res => {
        this.dyanmicDownloadByHtmlTag({
          fileName: 'vsb.json',
          text: JSON.stringify(res)
        });
      });
  }else if(id=='ctx'){
    this.encService.schemaCtxBlueprint()
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'ctx.json',
        text: JSON.stringify(res)
      });
    });
  }else if(id=='exp'){
    this.encService.schemaExpBlueprint()
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'exp.json',
        text: JSON.stringify(res)
      });
    });
  }else if(id=='tcb'){
    this.encService.schemaTcBlueprint()
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'tcb.json',
        text: JSON.stringify(res)
      });
    });
  }
  else if(id=='nsd'){
    this.encService.schemaNsDescriptor()
    .subscribe(res => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'nsd.json',
        text: JSON.stringify(res)
      });
    });
  }
  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }




  downloadBlueprint(id){
    if(id=='vsb'){
      this.encService.schemaVsBlueprint()
      .subscribe(res => {
      console.log("ressss",res)
      });
    }else if(id=='ctx'){
      this.encService.schemaCtxBlueprint()
      .subscribe(res => {
      //console.log("ressss",res)
      });
    }else if(id=='exp'){
      this.encService.schemaExpBlueprint()
      .subscribe(res => {
      //console.log("ressss",res)
      });
    }else if(id=='tc'){
      this.encService.schemaTcBlueprint()
      .subscribe(res => {
      //console.log("ressss",res)
      });
    }
    else if(id=='nsd'){
      this.encService.schemaNsDescriptor()
      .subscribe(res => {
      //console.log("ressss",res)
      });
    }

  }
}
