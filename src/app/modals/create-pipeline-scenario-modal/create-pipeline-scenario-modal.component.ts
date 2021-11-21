import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  PipelineScenarioTypeEnum,
  scenarioMap,
} from 'src/app/core/models/scenarios.model';
import { ModalOverlayRef } from 'src/app/core/services/modal.ref';

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
    private ngZone: NgZone,
    private modalRef: ModalOverlayRef
  ) {}

  ngOnInit(): void {}

  create() {}

  get scenarioName() {
    return this.form.get('scenarioName');
  }

  get scenarioType() {
    return this.form.get('scenarioType');
  }
}
