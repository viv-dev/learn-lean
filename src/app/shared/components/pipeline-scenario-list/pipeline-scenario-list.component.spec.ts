import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineScenarioListComponent } from './pipeline-scenario-list.component';

describe('PipelineScenarioListComponent', () => {
  let component: PipelineScenarioListComponent;
  let fixture: ComponentFixture<PipelineScenarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineScenarioListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineScenarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
