import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineScenarioLeaderboardComponent } from './pipeline-scenario-leaderboard.component';

describe('PipelineScenarioLeaderboardComponent', () => {
  let component: PipelineScenarioLeaderboardComponent;
  let fixture: ComponentFixture<PipelineScenarioLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineScenarioLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineScenarioLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
