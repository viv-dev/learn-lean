import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { PipelineScenarioInstance } from 'src/app/core/models/scenarios.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { PipelineScenarioDbService } from 'src/app/core/services/pipeline-scenario-db.service';

@Component({
  selector: 'll-pipeline-scenario-page',
  templateUrl: './pipeline-scenario-page.component.html',
  styleUrls: ['./pipeline-scenario-page.component.scss'],
})
export class PipelineScenarioPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  $scenarioConfig: Observable<PipelineScenarioInstance>;
  userId: string | null = null;
  $onDestroy = new Subject<void>();

  tab1Active = true;
  tab2Active = false;
  tab3Active = false;

  constructor(
    private pipelineScenarioService: PipelineScenarioDbService,
    private authService: AuthService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.$scenarioConfig = this.activated.paramMap.pipe(
      map((params: ParamMap) => {
        const scenarioId = params.get('id');
        if (!scenarioId) return '';
        return scenarioId;
      }),
      switchMap((id: string) => this.pipelineScenarioService.getOne(id)),
      tap(console.log)
    );

    this.authService
      .getUserId()
      .pipe(takeUntil(this.$onDestroy))
      .subscribe((id) => (id ? (this.userId = id) : (this.userId = '')));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.$onDestroy.next();
    this.$onDestroy.complete();
  }

  tabChanged(event: MatTabChangeEvent) {
    console.log(event);
    this.tab1Active = event.index === 0;
    this.tab2Active = event.index === 1;
    this.tab3Active = event.index === 2;
  }

  playerRole(scenarioData: PipelineScenarioInstance): string {
    if (this.userId === scenarioData.player1_id) {
      return 'Player1';
    } else if (this.userId === scenarioData.player2_id) {
      return 'Player2';
    } else if (this.userId === scenarioData.player3_id) {
      return 'Player3';
    } else if (this.userId === scenarioData.owner_id) {
      return 'Game Owner';
    } else {
      return 'Spectator';
    }
  }
}
