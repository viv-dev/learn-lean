import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineScenarioComponent } from './pipeline-scenario.component';

describe('PipelineScenarioComponent', () => {
  let component: PipelineScenarioComponent;
  let fixture: ComponentFixture<PipelineScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
