import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PipelineScenarioPageComponent } from './pages/pipeline-scenario-page/pipeline-scenario-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { LeaderBoardPageComponent } from './pages/leader-board-page/leader-board-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'app',
    component: AppShellComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'pipeline/:id',
        component: PipelineScenarioPageComponent,
      },
      {
        path: 'stats/:id',
        component: StatsPageComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderBoardPageComponent,
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
