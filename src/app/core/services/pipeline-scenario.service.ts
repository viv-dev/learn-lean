import { Injectable } from '@angular/core';
import { type } from 'os';
import { PipelineScenarioTypeEnum } from '../models/scenarios.model';
import { PipelineScenarioDbService } from './pipeline-scenario-db.service';

@Injectable({
  providedIn: 'root',
})
export class PipelineScenarioService {
  private creationMap = new Map<PipelineScenarioTypeEnum, () => void>([
    [PipelineScenarioTypeEnum.RANDOM, this.createRandomScenario],
    [PipelineScenarioTypeEnum.ORDERED, this.createOrderedScenario],
    [PipelineScenarioTypeEnum.BATCHED, this.createBatchedScenario],
    [PipelineScenarioTypeEnum.BATCH_RELEASED, this.createBatchReleasedScenario],
    [PipelineScenarioTypeEnum.PRIORITISED, this.createPrioritisedScenario],
  ]);

  constructor(private pipelineDBService: PipelineScenarioDbService) {}

  /*
  General rules 
  - only player 1 tokens light up
  - player 2 has to do some additional time consuming task
  - player 3 just has to shove tokens into the slot asap

  */
  createScenario(scenarioType: PipelineScenarioTypeEnum) {
    if (this.creationMap.has(scenarioType)) {
      this.creationMap.get(scenarioType)!();
    }
  }

  createRandomScenario() {
    /*
    Player 1 tokens light up in random order, put into slot as quickly as possible.
    Player 2 has to put tokens in order A, 1, B, 2, C, 3, etc
    Player 3 has to put tokens in order A, 1, B, 2, C, 3, etc
    */

    console.log('Would create random scenario (Type 1)');
  }

  createOrderedScenario() {
    /*
      Player 1 tokens light up in order A, 1, B, 2, C, 3 etc.
      Player 2 has to put tokens in order A, 1, B, 2, C, 3 etc.
      Player 3 has to put tokens in order A, 1, B, 2, C, 3 etc.
    */

    console.log('Would create ordered scenario (Type 2)');
  }

  createBatchedScenario() {
    /*
      Player 1 tokens light up in order A, 1, B, 2, C, 3 etc.
      Player 1 can initially only put tokens up to specified batch number (e.g. 8)

      Player 2 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 2 recieves tokens in batches from player 1 (e.g. 8)

      Player 3 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 3 recieves tokens in batches from player 2 (e.g. 8)

    */

    console.log('Would create batched scenario (Type 3)');
  }

  createBatchReleasedScenario() {
    /*
      Player 1 tokens light up in order A, 1, B, 2, C, 3 etc.
      Player 1 can initially only put tokens up to specified batch number (e.g. 8)
      Player 1 can only continue putting in tokens when player 2's remaining tokens
      is less than some number (e.g. 2)

      Player 2 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 2 recieves tokens in batches from player 1 (e.g. 8)

      Player 3 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 3 recieves tokens in batches from player 2 (e.g. 8)

    */

    console.log('Would create batch with release scenario (Type 4)');
  }

  createPrioritisedScenario() {
    /*
      Players have to put tokens in the order:
      A,B,C,D...J,1,2,3,4....10,K,L,M,N....T,11,12,13,14....20

      Follows batch released scenario rules otherwise.
    */

    console.log('Would create batch, released, prioritised scenario (Type 5)');
  }
}
