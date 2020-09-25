import { of } from 'rxjs';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BlueprintsVsService } from '../blueprints-vs.service';
import { BlueprintsVsComponent} from '../blueprints-compnents/blueprints-vs/blueprints-vs.component';

@Component({
  selector: 'app-support-tools-nsd',
  templateUrl: './support-tools-nsd.component.html',
  styleUrls: ['./support-tools-nsd.component.css']
})
export class SupportToolsNsdComponent implements OnInit {

  nsdObj: Object;

  vsbObj: Object;

  isLinear = true;

  firstFormGroup: FormGroup;


  constructor(@Inject(DOCUMENT) document,
    private _formBuilder: FormBuilder,
    //private blueprintsVsService: BlueprintsVsService,
    //private blueprintsVsComponent: BlueprintsVsComponent
    ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
   
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

  dynamicDownloadJson() {
    this.fakeValidateUserData().subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'My Report.json',
        text: JSON.stringify(res)
      });
    });
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

  onUploadedVsb(event: any, vsbs: File[]) {

    let promises = [];

    for (let vsb of vsbs) {
        let vsbPromise = new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsText(vsb);
            reader.onload = () => resolve(reader.result);
        });
        promises.push(vsbPromise);
    }

    Promise.all(promises).then(fileContents => {
        this.vsbObj = JSON.parse(fileContents[0]);
        console.log(this.vsbObj)
  
      });
  }

}

