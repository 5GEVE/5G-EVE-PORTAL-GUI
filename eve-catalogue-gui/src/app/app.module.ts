import { RegisterComponent } from './register/register.component';
import { DescriptorsVsComponent } from './descriptors-vs/descriptors-vs.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import{FlexLayoutModule} from '@angular/flex-layout'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MaterialModule }from './material/material.module'
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlueprintsEcComponent } from './blueprints-compnents/blueprints-ec/blueprints-ec.component';
import { BlueprintsTcComponent } from './blueprints-compnents/blueprints-tc/blueprints-tc.component';
import { BlueprintsEComponent } from './blueprints-compnents//blueprints-e/blueprints-e.component';
import { BlueprintsVsComponent } from './blueprints-compnents/blueprints-vs/blueprints-vs.component';
import { DescriptorsEComponent } from './descriptors-e/descriptors-e.component';
import { DescriptorsEDetailsComponent } from './descriptors-e-details/descriptors-e-details.component';
import { DescriptorsESchedulerComponent } from './descriptors-e-scheduler/descriptors-e-scheduler.component';
import { DescriptorsEStepperComponent } from './descriptors-e-stepper/descriptors-e-stepper.component';
import { DescriptorsEcComponent } from './descriptors-ec/descriptors-ec.component';
import { DescriptorsTcComponent } from './descriptors-tc/descriptors-tc.component';
import { ExperimentSubToolbarComponent } from './experiment-sub-toolbar/experiment-sub-toolbar.component';
import { ExperimentsMgmtDialogComponent } from './experiments-mgmt-dialog/experiments-mgmt-dialog.component';
import { ExperimentsExecuteDialogComponent } from './experiments-execute-dialog/experiments-execute-dialog.component';
import { ExperimentsResultsDialogComponent } from './experiments-results-dialog/experiments-results-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
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
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { CytoscapeModule } from 'ngx-cytoscape';
import { AppRoutes } from './app.routes';
import { BlueprintsVsStepperComponent } from './blueprints-compnents/blueprints-vs-stepper/blueprints-vs-stepper.component';
import { BlueprintsEStepperComponent } from './blueprints-compnents/blueprints-e-stepper/blueprints-e-stepper.component';
import { BlueprintsEDetailsComponent } from './blueprints-compnents/blueprints-e-details/blueprints-e-details.component';
import { BlueprintsGraphComponent } from './blueprints-graph/blueprints-graph.component';
import { BlueprintsVsDetailsComponent } from './blueprints-compnents/blueprints-vs-details/blueprints-vs-details.component';
import { MessagesComponent } from './messages/messages.component';
import { BlueprintsEcDetailsComponent } from './blueprints-compnents/blueprints-ec-details/blueprints-ec-details.component';
import { BlueprintsEcStepperComponent } from './blueprints-compnents/blueprints-ec-stepper/blueprints-ec-stepper.component';
import { DescriptorsVsDetailsComponent } from './descriptors-vs-details/descriptors-vs-details.component';
import { CatalogueSubToolbarComponent } from './catalogue-sub-toolbar/catalogue-sub-toolbar.component';
import { DesignSwitchComponent } from './design-switch/design-switch.component';
import { ExperimentSwitchComponent } from './experiment-switch/experiment-switch.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { ExperimentsDetailsComponent } from './experiments-details/experiments-details.component';
import { SitesSwitchComponent } from './sites-switch/sites-switch.component';
import {FooterComponent} from './navigation/footer/footer.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {LoginSubToolbarComponent} from './login-sub-toolbar/login-sub-toolbar.component';
import { NfvVnfDialogComponent } from './nfv-components/nfv-vnf-dialog/nfv-vnf-dialog.component';
import { NfvNsDialogComponent } from './nfv-components/nfv-ns-dialog/nfv-ns-dialog.component';
import { NfvNsGraphDialogComponent } from './nfv-components/nfv-ns-graph-dialog/nfv-ns-graph-dialog.component';
import { NfvVnfGraphDialogComponent } from './nfv-components/nfv-vnf-graph-dialog/nfv-vnf-graph-dialog.component';
import { NfvNsComponent } from './nfv-components/nfv-ns/nfv-ns.component';
import { NfvVnfComponent } from './nfv-components/nfv-vnf/nfv-vnf.component';
import { NfvPnfComponent } from './nfv-components/nfv-pnf/nfv-pnf.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { ExperimentMetricDashboardComponent } from './experiment-metric-dashboard/experiment-metric-dashboard.component';
import { ExecutionTcDetailsComponent } from './execution-tc-details/execution-tc-details.component';
import {APP_BASE_HREF} from '@angular/common';
import { SupportToolsSchemasComponent } from './support-tools-schemas/support-tools-schemas.component';
import { SupportToolsNsdComponent } from './support-tools-nsd/support-tools-nsd.component';
import { SupportToolsComposerComponent } from './support-tools-composer/support-tools-composer.component';
import { FilesServiceComponent } from './files-service/files-service.component';
import { FileServiceDialogComponent } from './files-service/file-service-dialog/file-service-dialog.component';
import { FileUploadDialogComponent } from './files-service/file-upload-dialog/file-upload-dialog.component';
import { FileDialogComponent } from './files-service/file-dialog/file-dialog.component';
import { FileDpRequestDialogComponent } from './files-service/file-dp-request-dialog/file-dp-request-dialog.component' 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    FooterComponent,
    HeaderComponent,
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
    CatalogueSubToolbarComponent,
    DesignSwitchComponent,
    ExperimentSwitchComponent,
    DescriptorsESchedulerComponent,
    ExperimentsComponent,
    ExperimentsDetailsComponent,
    SitesSwitchComponent,
    ExperimentSubToolbarComponent,
    SidenavListComponent,
    ExperimentsMgmtDialogComponent,
    ExperimentsExecuteDialogComponent,
    ExperimentsResultsDialogComponent,
    RegisterComponent,
    LoginSubToolbarComponent,
    NfvVnfDialogComponent,
    NfvNsDialogComponent,
    NfvNsGraphDialogComponent,
    NfvVnfGraphDialogComponent,
    NfvNsComponent,
    NfvVnfComponent,
    NfvPnfComponent,
    TicketingSystemComponent,
    ExperimentMetricDashboardComponent,
    ExecutionTcDetailsComponent,
    SupportToolsSchemasComponent,
    SupportToolsNsdComponent,
    SupportToolsComposerComponent,
    FilesServiceComponent,
    FileServiceDialogComponent,
    FileUploadDialogComponent,
    FileDialogComponent,
    FileDpRequestDialogComponent

  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
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
    //MatDialogRef,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    //CytoscapeModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

entryComponents: [
  ExperimentsMgmtDialogComponent,
  ExperimentsExecuteDialogComponent,
  ExperimentsResultsDialogComponent,
  NfvVnfDialogComponent,
  NfvNsDialogComponent,
  NfvNsGraphDialogComponent,
  NfvVnfGraphDialogComponent,
  ExecutionTcDetailsComponent,
  FileServiceDialogComponent,
  FileUploadDialogComponent,
  FileDialogComponent,
  FileDpRequestDialogComponent  
],

providers: [
{provide: LocationStrategy, useClass: HashLocationStrategy}
],
bootstrap: [AppComponent]
})
export class AppModule { }


