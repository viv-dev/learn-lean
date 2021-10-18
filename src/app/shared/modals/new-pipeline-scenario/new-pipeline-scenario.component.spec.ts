import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPipelineScenarioComponent } from './new-pipeline-scenario.component';

describe('NewPipelineScenarioComponent', () => {
  let component: NewPipelineScenarioComponent;
  let fixture: ComponentFixture<NewPipelineScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPipelineScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPipelineScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
