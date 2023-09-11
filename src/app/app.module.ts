import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FillPdfComponent } from './fill-pdf/fill-pdf.component';
import { PdfGenerateComponent } from './pdf-generate/pdf-generate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { FieldSettingsComponent } from './field-settings/field-settings.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { PdfFormsModule } from './pdf-forms/pdf-forms.module';
import { ImageSettingsComponent } from './image-settings/image-settings.component';
import { CheckBoxSettingsComponent } from './check-box-settings/check-box-settings.component';
import { SignatureSettingsComponent } from './signature-settings/signature-settings.component';
import { AngularSignaturePadModule }from '@almothafar/angular-signature-pad';

@NgModule({
  declarations: [
    AppComponent,
    FillPdfComponent,
    PdfGenerateComponent,
    FieldSettingsComponent,
    ImageSettingsComponent,
    CheckBoxSettingsComponent,
    SignatureSettingsComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AngularSignaturePadModule,
    MatCheckboxModule,
    MatButtonModule,  
    MatButtonToggleModule,
    MatChipsModule,
    MatDatepickerModule,
    PdfFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    SharedModule
  ],
  providers: [{ 
    provide: MatDialogRef,
    useValue: []
     }, 
    { 
    provide: MAT_DIALOG_DATA, 
    useValue: [] 
    }],

  bootstrap: [AppComponent],
})
export class AppModule {}
