
import { Component, OnInit } from '@angular/core';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsEcService } from '../blueprints-ec.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { BlueprintsTcService } from '../blueprints-tc.service';
import { NsdsService } from '../nsds.service';


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
  constructor(private blueprintsVsService: BlueprintsVsService,
    private blueprintsEcService: BlueprintsEcService,
    private blueprintsExpService: BlueprintsExpService,
    private blueprintsTcService: BlueprintsTcService,
    private nsdsService: NsdsService) { }

  ngOnInit() {
  }

  downloadBlueprint(id){
    if(id=='vsb'){
      this.blueprintsVsService.schemaVsBlueprint()
      .subscribe(res => {
      console.log("ressss",res)
      });  
    }else if(id=='ctx'){
      this.blueprintsEcService.schemaCtxBlueprint()
      .subscribe(res => {
      console.log("ressss",res)
      });       
    }else if(id=='exp'){
      this.blueprintsExpService.schemaExpBlueprint()
      .subscribe(res => {
      console.log("ressss",res)
      });       
    }else if(id=='tc'){
      this.blueprintsTcService.schemaTcBlueprint()
      .subscribe(res => {
      console.log("ressss",res)
      });       
    }
    else if(id=='nsd'){
      this.nsdsService.schemaNsDescriptor()
      .subscribe(res => {
      console.log("ressss",res)
      });       
    }
  
  }
}
