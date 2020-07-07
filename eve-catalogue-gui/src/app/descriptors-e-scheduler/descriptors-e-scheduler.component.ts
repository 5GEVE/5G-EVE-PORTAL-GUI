import { Component, OnInit } from '@angular/core';
import { ExpDescriptorInfo } from '../descriptors-e/exp-descriptor-info';
import { ExpBlueprintInfo } from '../blueprints-components/blueprints-e/exp-blueprint-info';
import { DescriptorsExpService } from '../descriptors-exp.service';
import { BlueprintsExpService } from '../blueprints-exp.service';
import { ExperimentsService } from '../experiments.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, UseCases} from '../auth.service';

export interface ViewValue {
  value: string;
  viewValue: string;
  item: Object;
}

@Component({
  selector: 'app-descriptors-e-scheduler',
  templateUrl: './descriptors-e-scheduler.component.html',
  styleUrls: ['./descriptors-e-scheduler.component.css']
})
export class DescriptorsESchedulerComponent implements OnInit {

  scheduleFormGroup: FormGroup;
  timeSlotStart = '';
  timeSlotEnd = '';

  expDescriptors: ViewValue[] = [];
  availableSites: string[] = [];
  start_date: string = '';
  start_time;
  end_time;
  end_date: string = '';
  use_cases: string[] = [];

  endLowerThenStart = false;
  endInThePast = false;

  disabled = true;

  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private descriptorsExpService: DescriptorsExpService,
    private blueprintsExpService: BlueprintsExpService,
    private experimentService: ExperimentsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.scheduleFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      expDescriptorId: ['', Validators.required],
      timeSlotStart: [undefined, Validators.required],
      timeSlotEnd: [undefined, Validators.required],
      targetSite: ['', Validators.required],
      useCase: ['', Validators.required]

    });
    this.getExpDescriptors();
    this.getUseCases();
  }

  getUseCases(){
    this.authService.getUseCases().subscribe((useCases: UseCases) => {
      this.use_cases = useCases['details'];
    });
  }


  getExpDescriptors() {
    this.descriptorsExpService.getExpDescriptors().subscribe((expDescriptorsInfos: ExpDescriptorInfo[]) =>
      {
        //console.log(expDescriptorsInfos);

        for (var i = 0; i < expDescriptorsInfos.length; i++) {
          this.expDescriptors.push({value: expDescriptorsInfos[i]['expDescriptorId'], viewValue: expDescriptorsInfos[i]['name'], item: expDescriptorsInfos[i]});
        }
      });
  }

  getStartDate(event: any) {
    const data = event;
    const formattedDate = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
    this.start_date = formattedDate;
    this.start_time = data.getTime();
    this.validateDates();
  }

  getEndDate(event: any) {
    const data = event;
    if (data !== undefined) {
      const formattedDate = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear();
      this.end_date = formattedDate;
      this.end_time = data.getTime();
    }
    this.validateDates();
  }


  validateDates(){
    const date = new Date();
    const todayDate = date.getTime();


    if ( this.start_time !== undefined && this.start_time !== ''  && this.end_time !== undefined && this.end_time !== '' ) {
      if (this.start_time > this.end_time) {
        this.endLowerThenStart = true;
      } else if (todayDate > this.end_time) {
        this.endInThePast = true;
      } else {
        this.endInThePast = false;
        this.endLowerThenStart = false;
      }
    } else {
      this.endInThePast = true;
      this.endLowerThenStart = true;
    }
    if (this.endInThePast || this.endLowerThenStart){
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  onExpDSelected(event: any) {
    var selectedDescriptor = event.value;

    for (var i = 0; i < this.expDescriptors.length; i++) {
      if (this.expDescriptors[i]['value'] === selectedDescriptor) {
        var expD = this.expDescriptors[i].item;
        var expBId = expD['expBlueprintId'];
        this.getExpBlueprint(expBId);
      }
    }
  }

  getExpBlueprint(expBId: string) {
    this.blueprintsExpService.getExpBlueprint(expBId).subscribe(expBlueprintInfo => {
      console.log(expBlueprintInfo['expBlueprint']['sites']);
      this.availableSites = expBlueprintInfo['expBlueprint']['sites'];
    });
  }

  scheduleExperiment() {
    if(!this.scheduleFormGroup.invalid){
    var executionName = this.scheduleFormGroup.get('name').value;
    var expDescriptorId = this.scheduleFormGroup.get('expDescriptorId').value;
    var startDate = this.scheduleFormGroup.get('timeSlotStart').value;
    var endDate = this.scheduleFormGroup.get('timeSlotEnd').value;
    var targetSite = this.scheduleFormGroup.get('targetSite').value;
    var useCase = this.scheduleFormGroup.get('useCase').value;

    endDate.setHours(23,59,59,999);

    var scheduleExperimentRequest = JSON.parse('{}');
    scheduleExperimentRequest['experimentName'] = executionName;
    scheduleExperimentRequest['experimentDescriptorId'] = expDescriptorId;
    scheduleExperimentRequest['proposedTimeSlot'] = {};
    scheduleExperimentRequest['proposedTimeSlot']['startTime'] = startDate;
    scheduleExperimentRequest['proposedTimeSlot']['stopTime'] = endDate;
    scheduleExperimentRequest['targetSites'] = [targetSite];
    scheduleExperimentRequest['useCase'] = useCase;

    //console.log(JSON.stringify(scheduleExperimentRequest, null, 4));

    this.experimentService.postExperiment(scheduleExperimentRequest, '/experiments')
          .subscribe(experimentId => {
            console.log('Experiment created w/ id = ' + experimentId)
            this.router.navigate(['/experiments']);
          });
   }
  }
}
