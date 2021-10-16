import { TestBed } from '@angular/core/testing';

import { PipelineScenarioService } from './pipeline-scenario.service';

describe('PipelineScenarioService', () => {
  let service: PipelineScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
