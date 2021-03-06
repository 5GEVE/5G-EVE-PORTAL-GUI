import { Routes } from '@angular/router';
import { PortalHomeComponent } from './portal-home/portal-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlueprintsVsComponent } from './blueprints-components/blueprints-vs/blueprints-vs.component';
import { BlueprintsTcComponent } from './blueprints-components/blueprints-tc/blueprints-tc.component';
import { BlueprintsEcComponent } from './blueprints-components/blueprints-ec/blueprints-ec.component';
import { BlueprintsEComponent } from './blueprints-components/blueprints-e/blueprints-e.component';
import { DescriptorsVsComponent } from './descriptors-vs/descriptors-vs.component';
import { DescriptorsTcComponent } from './descriptors-tc/descriptors-tc.component';
import { DescriptorsEcComponent } from './descriptors-ec/descriptors-ec.component';
import { DescriptorsEComponent } from './descriptors-e/descriptors-e.component';
import { NfvNsComponent } from './nfv-components/nfv-ns/nfv-ns.component';
import { NfvPnfComponent } from './nfv-components/nfv-pnf/nfv-pnf.component';
import { NfvVnfComponent } from './nfv-components/nfv-vnf/nfv-vnf.component';
import { BlueprintsEDetailsComponent } from './blueprints-components/blueprints-e-details/blueprints-e-details.component';
import { BlueprintsEcDetailsComponent } from './blueprints-components/blueprints-ec-details/blueprints-ec-details.component';
import { BlueprintsVsDetailsComponent } from './blueprints-components/blueprints-vs-details/blueprints-vs-details.component';
import { DescriptorsEDetailsComponent } from './descriptors-e-details/descriptors-e-details.component';
import { DescriptorsVsDetailsComponent } from './descriptors-vs-details/descriptors-vs-details.component';
import { BlueprintsEStepperComponent } from './blueprints-components/blueprints-e-stepper/blueprints-e-stepper.component';
import { DesignSwitchComponent } from './design-switch/design-switch.component';
import { ExperimentSwitchComponent } from './experiment-switch/experiment-switch.component';
import { DescriptorsESchedulerComponent } from './descriptors-e-scheduler/descriptors-e-scheduler.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentsDetailsComponent } from './experiments-details/experiments-details.component';
import { SitesSwitchComponent } from './sites-switch/sites-switch.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { LoginComponent } from './login/login.component';
import { ExperimentMetricDashboardComponent } from './experiment-metric-dashboard/experiment-metric-dashboard.component';
import { FilesServiceComponent } from './files-service/files-service.component';
import { ExecutionTcDetailsComponent } from './execution-tc-details/execution-tc-details.component';


export const AppRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'portal_home', component: PortalHomeComponent },
    { path: 'design_experiment', component: DashboardComponent },
    { path: 'request_experiment', component: ExperimentSwitchComponent },
    { path: 'manage_site', component: SitesSwitchComponent },
    { path: 'schedule_experiment', component: DescriptorsESchedulerComponent },
    /*{ path: 'dashboard', component: DashboardComponent },*/
    { path: 'blueprints_vs', component: BlueprintsVsComponent },
    { path: 'blueprints_tc', component: BlueprintsTcComponent },
    { path: 'blueprints_ec', component: BlueprintsEcComponent },
    { path: 'blueprints_exp', component: BlueprintsEComponent },
    { path: 'descriptors_vs', component: DescriptorsVsComponent },
    { path: 'descriptors_tc', component: DescriptorsTcComponent },
    { path: 'descriptors_ec', component: DescriptorsEcComponent },
    { path: 'descriptors_exp', component: DescriptorsEComponent },
    { path: 'nfv_ns', component: NfvNsComponent },
    { path: 'nfv_pnf', component: NfvPnfComponent },
    { path: 'nfv_vnf', component: NfvVnfComponent },
    { path: 'blueprints_e_details', component: BlueprintsEDetailsComponent },
    { path: 'blueprints_ec_details', component: BlueprintsEcDetailsComponent },
    { path: 'blueprints_vs_details', component: BlueprintsVsDetailsComponent },
    { path: 'descriptors_e_details', component: DescriptorsEDetailsComponent },
    { path: 'descriptors_vs_details', component: DescriptorsVsDetailsComponent },
    { path: 'onboard_exp_blueprint', component: BlueprintsEStepperComponent},
    { path: 'experiments', component: ExperimentsComponent },
    { path: 'experiments_details', component: ExperimentsDetailsComponent },
    { path: 'tickets', component: TicketingSystemComponent },
    { path: 'login', component: LoginComponent},
    { path: 'metrics_dashboard', component: ExperimentMetricDashboardComponent},
    { path: 'vnfs', component: FilesServiceComponent },
    { path: 'execute_tc_details', component: ExecutionTcDetailsComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '/portal_home' }
];
