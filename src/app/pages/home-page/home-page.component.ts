import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PipelineScenarioInstance } from 'src/app/core/models/scenarios.model';
import { PipelineScenarioService } from 'src/app/core/services/pipeline-scenario.service';

@Component({
  selector: 'll-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  $scenarios: Observable<PipelineScenarioInstance[]>;

  displayedColumns: string[] = ['name', 'type', 'status', 'players', 'actions'];

  constructor(private pipelineScenarioService: PipelineScenarioService) {
    this.$scenarios = this.pipelineScenarioService
      .getAll()
      .pipe(tap(console.log));
  }

  ngOnInit(): void {}
}
