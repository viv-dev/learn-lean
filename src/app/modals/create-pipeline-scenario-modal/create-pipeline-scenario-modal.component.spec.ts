import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePipelineScenarioModalComponent } from './create-pipeline-scenario-modal.component';

describe('CreatePipelineScenarioModalComponent', () => {
  let component: CreatePipelineScenarioModalComponent;
  let fixture: ComponentFixture<CreatePipelineScenarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePipelineScenarioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePipelineScenarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
