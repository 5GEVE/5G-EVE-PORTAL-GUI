import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CytoscapeModule } from 'ngx-cytoscape';
import { AppRoutes } from './app.routes';
import { SideTopBarComponent } from './side-top-bar/side-top-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlueprintsVsComponent } from './blueprints-components/blueprints-vs/blueprints-vs.component';
import { BlueprintsEcComponent } from './blueprints-components/blueprints-ec/blueprints-ec.component';
import { BlueprintsEComponent } from './blueprints-components/blueprints-e/blueprints-e.component';
import { DescriptorsVsComponent } from './descriptors-vs/descriptors-vs.component';
import { DescriptorsEcComponent } from './descriptors-ec/descriptors-ec.component';
import { DescriptorsEComponent } from './descriptors-e/descriptors-e.component';
import { NfvNsComponent } from './nfv-components/nfv-ns/nfv-ns.component';
import { NfvVnfComponent } from './nfv-components/nfv-vnf/nfv-vnf.component';
import { NfvPnfComponent } from './nfv-components/nfv-pnf/nfv-pnf.component';
import { BlueprintsVsStepperComponent } from './blueprints-components/blueprints-vs-stepper/blueprints-vs-stepper.component';
import { BlueprintsEStepperComponent } from './blueprints-components/blueprints-e-stepper/blueprints-e-stepper.component';
import { BlueprintsEDetailsComponent } from './blueprints-components/blueprints-e-details/blueprints-e-details.component';
import { LoginComponent } from './login/login.component';
import { BlueprintsGraphComponent } from './blueprints-graph/blueprints-graph.component';
import { BlueprintsVsDetailsComponent } from './blueprints-components/blueprints-vs-details/blueprints-vs-details.component';
import { BlueprintsVsService } from './blueprints-vs.service';
import { MessagesComponent } from './messages/messages.component';
import { BlueprintsEcDetailsComponent } from './blueprints-components/blueprints-ec-details/blueprints-ec-details.component';
import { BlueprintsEcStepperComponent } from './blueprints-components/blueprints-ec-stepper/blueprints-ec-stepper.component';
import { BlueprintsTcComponent } from './blueprints-components/blueprints-tc/blueprints-tc.component';
import { DescriptorsEStepperComponent } from './descriptors-e-stepper/descriptors-e-stepper.component';
import { DescriptorsTcComponent } from './descriptors-tc/descriptors-tc.component';
import { DescriptorsVsDetailsComponent } from './descriptors-vs-details/descriptors-vs-details.component';
import { DescriptorsEDetailsComponent } from './descriptors-e-details/descriptors-e-details.component';
import { PortalHomeComponent } from './portal-home/portal-home.component';
import { CatalogueSubToolbarComponent } from './catalogue-sub-toolbar/catalogue-sub-toolbar.component';
import { DesignSwitchComponent } from './design-switch/design-switch.component';
import { ExperimentSwitchComponent } from './experiment-switch/experiment-switch.component';
import { DescriptorsESchedulerComponent } from './descriptors-e-scheduler/descriptors-e-scheduler.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentsDetailsComponent } from './experiments-details/experiments-details.component';
import { SitesSwitchComponent } from './sites-switch/sites-switch.component';
import { ExperimentSubToolbarComponent } from './experiment-sub-toolbar/experiment-sub-toolbar.component';
import { ExperimentsMgmtDialogComponent } from './experiments-mgmt-dialog/experiments-mgmt-dialog.component';
import { ExperimentsExecuteDialogComponent } from './experiments-execute-dialog/experiments-execute-dialog.component';
import { ExperimentsResultsDialogComponent } from './experiments-results-dialog/experiments-results-dialog.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { NfvVnfDialogComponent } from './nfv-components/nfv-vnf-dialog/nfv-vnf-dialog.component';
import { NfvNsDialogComponent } from './nfv-components/nfv-ns-dialog/nfv-ns-dialog.component';
import { NfvNsGraphDialogComponent } from './nfv-components/nfv-ns-graph-dialog/nfv-ns-graph-dialog.component';
import { NfvVnfGraphDialogComponent } from './nfv-components/nfv-vnf-graph-dialog/nfv-vnf-graph-dialog.component';
import { ExperimentMetricDashboardComponent } from './experiment-metric-dashboard/experiment-metric-dashboard.component';
import { FilesServiceComponent } from './files-service/files-service.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FileServiceDialogComponent } from './file-service-dialog/file-service-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { ExecutionTcDetailsComponent} from './execution-tc-details/execution-tc-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SideTopBarComponent,
    DashboardComponent,
    BlueprintsVsComponent,
    BlueprintsEcComponent,
    BlueprintsEComponent,
    DescriptorsVsComponent,
    DescriptorsEcComponent,
    DescriptorsEComponent,
    NfvNsComponent,
    NfvVnfComponent,
    NfvPnfComponent,
    BlueprintsVsStepperComponent,
    BlueprintsEStepperComponent,
    BlueprintsEDetailsComponent,
    LoginComponent,
    BlueprintsGraphComponent,
    BlueprintsVsDetailsComponent,
    MessagesComponent,
    BlueprintsEcDetailsComponent,
    BlueprintsEcStepperComponent,
    BlueprintsTcComponent,
    DescriptorsEStepperComponent,
    DescriptorsTcComponent,
    DescriptorsVsDetailsComponent,
    DescriptorsEDetailsComponent,
    PortalHomeComponent,
    CatalogueSubToolbarComponent,
    DesignSwitchComponent,
    ExperimentSwitchComponent,
    DescriptorsESchedulerComponent,
    ExperimentsComponent,
    ExperimentsDetailsComponent,
    SitesSwitchComponent,
    ExperimentSubToolbarComponent,
    ExperimentsMgmtDialogComponent,
    ExperimentsExecuteDialogComponent,
    ExperimentsResultsDialogComponent,
    TicketingSystemComponent,
    NfvVnfDialogComponent,
    NfvNsDialogComponent,
    NfvNsGraphDialogComponent,
    NfvVnfGraphDialogComponent,
    ExperimentMetricDashboardComponent,
    TicketingSystemComponent,
    FilesServiceComponent,
    FileServiceDialogComponent,
    FileUploadDialogComponent,
    FileDialogComponent,
    ExecutionTcDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    CytoscapeModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    ExperimentsMgmtDialogComponent,
    ExperimentsExecuteDialogComponent,
    ExperimentsResultsDialogComponent,
    NfvVnfDialogComponent,
    NfvNsDialogComponent,
    NfvNsGraphDialogComponent,
    NfvVnfGraphDialogComponent,
    FileServiceDialogComponent,
    FileUploadDialogComponent,
    FileDialogComponent,
    ExecutionTcDetailsComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, ExperimentsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
