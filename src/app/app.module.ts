import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular CDK
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

// Angular Fire
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

// Angular Material
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// App Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppShellComponent } from './app-shell/app-shell.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NewPipelineScenarioComponent } from './shared/modals/new-pipeline-scenario/new-pipeline-scenario.component';
import { MatResponsiveTableDirective } from './shared/directives/mat-responsive-table.directive';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PipelineScenarioTypeMapPipe } from './shared/pipes/pipeline-scenario-type-map.pipe';
import { PipelineScenarioStateMapPipe } from './shared/pipes/pipeline-scenario-state-map.pipe';
import { PipelineScenarioListComponent } from './shared/components/pipeline-scenario-list/pipeline-scenario-list.component';
import { PipelineScenarioLeaderboardComponent } from './shared/components/pipeline-scenario-leaderboard/pipeline-scenario-leaderboard.component';
import { PipelineScenarioPageComponent } from './pages/pipeline-scenario-page/pipeline-scenario-page.component';
import { PipelineScenarioComponent } from './pages/pipeline-scenario-page/pipeline-scenario/pipeline-scenario.component';
import { PipelineStatusBarComponent } from './pages/pipeline-scenario-page/pipeline-status-bar/pipeline-status-bar.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { LeaderBoardPageComponent } from './pages/leader-board-page/leader-board-page.component';
import { CreatePipelineScenarioModalComponent } from './modals/create-pipeline-scenario-modal/create-pipeline-scenario-modal.component';
import { IsAdminDirective } from './shared/directives/is-admin.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppShellComponent,
    LoginPageComponent,
    HomePageComponent,
    NotFoundPageComponent,
    NewPipelineScenarioComponent,
    MatResponsiveTableDirective,
    PipelineScenarioTypeMapPipe,
    PipelineScenarioStateMapPipe,
    PipelineScenarioListComponent,
    PipelineScenarioLeaderboardComponent,
    PipelineScenarioPageComponent,
    PipelineScenarioComponent,
    PipelineStatusBarComponent,
    StatsPageComponent,
    LeaderBoardPageComponent,
    CreatePipelineScenarioModalComponent,
    IsAdminDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    FlexLayoutModule,
    FontAwesomeModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
