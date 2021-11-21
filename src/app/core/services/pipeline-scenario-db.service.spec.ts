import { TestBed } from '@angular/core/testing';

import { PipelineScenarioDbService } from './pipeline-scenario-db.service';

describe('PipelineScenarioService', () => {
  let service: PipelineScenarioDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineScenarioDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
