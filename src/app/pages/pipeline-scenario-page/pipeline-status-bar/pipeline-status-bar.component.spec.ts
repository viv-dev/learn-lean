import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineStatusBarComponent } from './pipeline-status-bar.component';

describe('PipelineStatusBarComponent', () => {
  let component: PipelineStatusBarComponent;
  let fixture: ComponentFixture<PipelineStatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineStatusBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
