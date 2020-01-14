import { TdDataTableProgressBarComponent } from './components/td-data-table-progress-bar/td-data-table-progress-bar.component';
import { KeylengthPipe } from './pipe/keylength.pipe';
import './libs/rxjs-operators';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatTableModule,
  MatGridListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CovalentChipsModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMediaModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule,
} from '@covalent/core';
import * as firebase from 'firebase/app';

import { environment } from '../../../environments/environment';
import { MdCardProgressBarComponent } from './components/md-card-progress-bar/md-card-progress-bar.component';
import { MdProgressBarOverlayComponent } from './components/md-progress-bar-overlay/md-progress-bar-overlay.component';
import { MdResultMessageComponent } from './components/md-result-message/md-result-message.component';
import { RegisterAssetsService } from './services/register-assets.service';
import { MdProgressSpinnerOverlayComponent } from 'app/core/shared/components/md-progress-spinner-overlay/md-progress-spinner-overlay.component';

@NgModule({
  declarations: [
    // components
    MdProgressBarOverlayComponent,
    MdProgressSpinnerOverlayComponent,
    MdCardProgressBarComponent,
    TdDataTableProgressBarComponent,
    MdResultMessageComponent,
    

    // pipes
    KeylengthPipe
  ],
  imports: [
    // Angular
    CommonModule,
    BrowserAnimationsModule,

    // Material
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatGridListModule,

    // Covalent
    CovalentLayoutModule,
    CovalentMessageModule,
    CovalentDataTableModule,
    CovalentChipsModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentFileModule,
  ],
  exports: [
    // Custom Material Design components
    MdProgressBarOverlayComponent,
    MdProgressSpinnerOverlayComponent,
    MdCardProgressBarComponent,
    TdDataTableProgressBarComponent,
    MdResultMessageComponent,
    

    // pipe
    KeylengthPipe,

    // Material
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatGridListModule,

    // Covalent
    CovalentLayoutModule,
    CovalentMessageModule,
    CovalentDataTableModule,
    CovalentChipsModule,
    CovalentLoadingModule,
    CovalentMediaModule,
    CovalentFileModule,
  ],
  providers: [RegisterAssetsService]

})

export class SharedModule {
  constructor() {
    // Init firebase
    firebase.initializeApp(environment.firebaseConfig);
  }
}
