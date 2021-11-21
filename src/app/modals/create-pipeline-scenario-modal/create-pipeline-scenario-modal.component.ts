import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  PipelineScenarioTypeEnum,
  scenarioMap,
} from 'src/app/core/models/scenarios.model';
import { ModalOverlayRef } from 'src/app/core/services/modal.ref';
import { PipelineScenarioService } from 'src/app/core/services/pipeline-scenario.service';

@Component({
  selector: 'll-create-pipeline-scenario-modal',
  templateUrl: './create-pipeline-scenario-modal.component.html',
  styleUrls: ['./create-pipeline-scenario-modal.component.scss'],
})
export class CreatePipelineScenarioModalComponent implements OnInit {
  form = this.fb.group({
    scenarioName: ['', [Validators.required]],
    scenarioType: [PipelineScenarioTypeEnum.RANDOM, [Validators.required]],
  });

  creating = false;

  scenarioMap = scenarioMap;

  constructor(
    private fb: FormBuilder,
    private pipelineScenario: PipelineScenarioService,
    private modalRef: ModalOverlayRef
  ) {}

  ngOnInit(): void {}

  async create() {
    if (this.form.valid) {
      this.creating = true;
      const scenarioId = await this.pipelineScenario.createScenario(
        this.scenarioName?.value,
        this.scenarioType?.value
      );
      this.creating = false;

      this.modalRef.close({ scenarioId }, 'submit');
    }
  }

  get scenarioName() {
    return this.form.get('scenarioName');
  }

  get scenarioType() {
    return this.form.get('scenarioType');
  }
}
