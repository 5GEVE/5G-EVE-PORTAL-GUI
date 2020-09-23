import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlueprintsTcComponent } from './blueprints-compnents/blueprints-tc/blueprints-tc.component';
import { BlueprintsEcComponent } from './blueprints-compnents/blueprints-ec/blueprints-ec.component';
import { BlueprintsEComponent } from './blueprints-compnents/blueprints-e/blueprints-e.component';
import { BlueprintsVsComponent } from './blueprints-compnents//blueprints-vs/blueprints-vs.component';
import { ExperimentSwitchComponent } from './experiment-switch/experiment-switch.component';
import { DescriptorsESchedulerComponent } from './descriptors-e-scheduler/descriptors-e-scheduler.component';
import { DescriptorsEComponent } from './descriptors-e/descriptors-e.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { SitesSwitchComponent } from './sites-switch/sites-switch.component';
import { RegisterComponent } from './register/register.component';
import { BlueprintsEDetailsComponent } from './blueprints-compnents/blueprints-e-details/blueprints-e-details.component';
import { ExperimentsDetailsComponent } from './experiments-details/experiments-details.component';
import { BlueprintsEcDetailsComponent } from './blueprints-compnents/blueprints-ec-details/blueprints-ec-details.component';
import { BlueprintsVsDetailsComponent } from './blueprints-compnents/blueprints-vs-details/blueprints-vs-details.component';
import { DescriptorsEDetailsComponent } from './descriptors-e-details/descriptors-e-details.component';
import { DescriptorsVsDetailsComponent } from './descriptors-vs-details/descriptors-vs-details.component';
import { BlueprintsEStepperComponent } from './blueprints-compnents/blueprints-e-stepper/blueprints-e-stepper.component';
import { DescriptorsEcComponent } from './descriptors-ec/descriptors-ec.component';
import { DescriptorsTcComponent } from './descriptors-tc/descriptors-tc.component';
import { DescriptorsVsComponent } from './descriptors-vs/descriptors-vs.component';
import { NfvNsComponent } from './nfv-components/nfv-ns/nfv-ns.component';
import { NfvPnfComponent } from './nfv-components/nfv-pnf/nfv-pnf.component';
import { NfvVnfComponent } from './nfv-components/nfv-vnf/nfv-vnf.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { ExperimentMetricDashboardComponent } from './experiment-metric-dashboard/experiment-metric-dashboard.component';
import { ExecutionTcDetailsComponent } from './execution-tc-details/execution-tc-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent  },
  { path: 'design_experiment', component: DashboardComponent },
  {path:'home',component:HomeComponent},
  { path: 'blueprints_tc', component: BlueprintsTcComponent },
  { path: 'blueprints_ec', component: BlueprintsEcComponent },
  { path: 'blueprints_exp', component: BlueprintsEComponent },
  { path: 'blueprints_vs', component: BlueprintsVsComponent }, 
  { path: 'request_experiment', component: ExperimentSwitchComponent },
  { path: 'schedule_experiment', component: DescriptorsESchedulerComponent },
  { path: 'descriptors_exp', component: DescriptorsEComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'manage_site', component: SitesSwitchComponent },
  { path: 'blueprints_e_details', component: BlueprintsEDetailsComponent },
  { path: 'blueprints_ec_details', component: BlueprintsEcDetailsComponent },
  { path: 'blueprints_vs_details', component: BlueprintsVsDetailsComponent },
  { path: 'descriptors_e_details', component: DescriptorsEDetailsComponent },
  { path: 'descriptors_vs_details', component: DescriptorsVsDetailsComponent },
  { path: 'onboard_exp_blueprint', component: BlueprintsEStepperComponent},
  { path: 'experiments_details', component: ExperimentsDetailsComponent },
  { path: 'descriptors_ec', component: DescriptorsEcComponent },
  { path: 'descriptors_vs', component: DescriptorsVsComponent },
  { path: 'descriptors_tc', component: DescriptorsTcComponent },
  { path: 'login', component: LoginComponent},
  { path: 'nfv_ns', component: NfvNsComponent },
  { path: 'nfv_pnf', component: NfvPnfComponent },
  { path: 'nfv_vnf', component: NfvVnfComponent },
  { path: 'tickets', component: TicketingSystemComponent },
  { path: 'metrics_dashboard', component: ExperimentMetricDashboardComponent},
  { path: 'execute_tc_details', component: ExecutionTcDetailsComponent },

  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



