import { Pipe, PipeTransform } from '@angular/core';
import {
  PipelineScenarioStateEnum,
  pipelineScenarioStateLookup,
} from '../core/models/scenarios.model';

@Pipe({
  name: 'pipelineScenarioStateMap',
})
export class PipelineScenarioStateMapPipe implements PipeTransform {
  transform(value: PipelineScenarioStateEnum): string {
    return pipelineScenarioStateLookup(value);
  }
}
