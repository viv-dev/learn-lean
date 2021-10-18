import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineScenarioPageComponent } from './pipeline-scenario-page.component';

describe('PipelineScenarioPageComponent', () => {
  let component: PipelineScenarioPageComponent;
  let fixture: ComponentFixture<PipelineScenarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineScenarioPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineScenarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
