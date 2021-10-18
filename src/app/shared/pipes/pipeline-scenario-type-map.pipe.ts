import { Pipe, PipeTransform } from '@angular/core';
import {
  PipelineScenarioTypeEnum,
  pipelineScenarioTypeLookup,
} from '../../core/models/scenarios.model';

@Pipe({
  name: 'pipelineScenarioTypeMap',
})
export class PipelineScenarioTypeMapPipe implements PipeTransform {
  transform(value: PipelineScenarioTypeEnum): string {
    return pipelineScenarioTypeLookup(value);
  }
}
