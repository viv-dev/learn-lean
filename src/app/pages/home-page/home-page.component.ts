import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { PipelineScenarioInstance } from 'src/app/core/models/scenarios.model';
import { ModalOverlayRef } from 'src/app/core/services/modal.ref';
import { ModalService } from 'src/app/core/services/modal.service';
import { PipelineScenarioDbService } from 'src/app/core/services/pipeline-scenario-db.service';
import { CreatePipelineScenarioModalComponent } from 'src/app/modals/create-pipeline-scenario-modal/create-pipeline-scenario-modal.component';

@Component({
  selector: 'll-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  $scenarios: Observable<PipelineScenarioInstance[]>;

  displayedColumns: string[] = ['name', 'type', 'status', 'players', 'actions'];

  private modalRef: ModalOverlayRef | null = null;

  constructor(
    private pipelineScenarioService: PipelineScenarioDbService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.$scenarios = this.pipelineScenarioService.getAll();
  }

  ngOnInit(): void {}

  openCreateModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.modalRef =
      this.modalService.openComponentModal<CreatePipelineScenarioModalComponent>(
        CreatePipelineScenarioModalComponent
      );

    this.modalRef.onClosed$
      .pipe(take(1))
      .toPromise()
      .then((data) => {
        if (data.type === 'submit' && data.data && data.data.scenarioId) {
          this.router.navigateByUrl(`/app/pipeline/${data.data.scenarioId}`);
        }

        this.modalRef = null;
      });
  }

  deleteScenario(scenario: PipelineScenarioInstance) {
    console.log(`Deleting ${scenario.name}`);
  }
}
