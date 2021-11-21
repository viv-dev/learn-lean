import { Injectable } from '@angular/core';
import {
  PipelineScenarioTypeEnum,
  PipelineScenarioStateEnum,
  PipelineScenarioInstance,
} from '../models/scenarios.model';
import { PipelineScenarioDbService } from './pipeline-scenario-db.service';

import { shuffle } from 'src/app/core/utils/arrays';
import { AuthService } from './auth.service';

const LETTERS: string[] = Array.from('abcdefghijklmnopqrst');

const NUMBERS: string[] = [...Array(20).keys()].map((num) =>
  (num + 1).toString()
);

const FULL_SET: string[] = [...LETTERS.slice(0, 20), ...NUMBERS];

const WEAVED_ORDER: string[] = (() => {
  const arr = [];
  for (let i = 0; i < 20; i++) {
    arr.push(LETTERS[i].toUpperCase());
    arr.push(NUMBERS[i].toString());
  }

  return arr;
})();

const PRIORITISED_ORDER: string[] = (() => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(LETTERS[i].toUpperCase());
  }
  for (let i = 0; i < 10; i++) {
    arr.push(NUMBERS[i].toString());
  }
  for (let i = 10; i < 20; i++) {
    arr.push(LETTERS[i].toUpperCase());
  }
  for (let i = 10; i < 20; i++) {
    arr.push(NUMBERS[i].toString());
  }
  return arr;
})();

@Injectable({
  providedIn: 'root',
})
export class PipelineScenarioService {
  private creationMap: Map<
    PipelineScenarioTypeEnum,
    (name: string) => Promise<string>
  >;

  constructor(
    private pipelineDBService: PipelineScenarioDbService,
    private authService: AuthService
  ) {
    this.creationMap = new Map<
      PipelineScenarioTypeEnum,
      (name: string) => Promise<string>
    >([
      [PipelineScenarioTypeEnum.RANDOM, this.createRandomScenario],
      [PipelineScenarioTypeEnum.ORDERED, this.createOrderedScenario],
      [PipelineScenarioTypeEnum.BATCHED, this.createBatchedScenario],
      [
        PipelineScenarioTypeEnum.BATCH_RELEASED,
        this.createBatchReleasedScenario,
      ],
      [PipelineScenarioTypeEnum.PRIORITISED, this.createPrioritisedScenario],
    ]);
  }

  /*
  General rules 
  - only player 1 tokens light up
  - player 2 has to do some additional time consuming task
  - player 3 just has to shove tokens into the slot asap

  */
  async createScenario(
    scenarioName: string,
    scenarioType: PipelineScenarioTypeEnum
  ): Promise<string> {
    console.log(`Creating ${scenarioName} of type ${scenarioType}...`);
    if (this.creationMap.has(scenarioType)) {
      return await this.creationMap.get(scenarioType)!(scenarioName);
    }
    return '';
  }

  private createRandomScenario = async (
    scenarioName: string
  ): Promise<string> => {
    /*
    Player 1 tokens light up in random order, put into slot as quickly as possible.
    Player 2 has to put tokens in order A, 1, B, 2, C, 3, etc
    Player 3 has to put tokens in order A, 1, B, 2, C, 3, etc
    */

    const instance: PipelineScenarioInstance = {
      name: scenarioName,
      type: PipelineScenarioTypeEnum.RANDOM,
      state: PipelineScenarioStateEnum.CONFIGURING,

      batched: false,
      batchSize: 0,
      released: false,
      releaseSize: 0,

      owner_id: '',

      player1_id: '',
      player1_tokens: shuffle(FULL_SET),
      player1_next: shuffle(FULL_SET),

      player2_id: '',
      player2_tokens: [],
      player2_next: WEAVED_ORDER,

      player3_id: '',
      player3_tokens: [],
      player3_next: WEAVED_ORDER,

      totalTime: 0,
      completed: false,
      dateCreated: {},
    };

    return this.pipelineDBService.createOne(instance);
  };

  private createOrderedScenario = async (
    scenarioName: string
  ): Promise<string> => {
    /*
      Player 1 tokens light up in order A, 1, B, 2, C, 3 etc.
      Player 2 has to put tokens in order A, 1, B, 2, C, 3 etc.
      Player 3 has to put tokens in order A, 1, B, 2, C, 3 etc.
    */
    const instance: PipelineScenarioInstance = {
      name: scenarioName,
      type: PipelineScenarioTypeEnum.RANDOM,
      state: PipelineScenarioStateEnum.CONFIGURING,

      batched: false,
      batchSize: 0,

      released: false,
      releaseSize: 0,

      owner_id: '',

      player1_id: '',
      player1_tokens: shuffle(FULL_SET),
      player1_next: WEAVED_ORDER,

      player2_id: '',
      player2_tokens: [],
      player2_next: WEAVED_ORDER,

      player3_id: '',
      player3_tokens: [],
      player3_next: WEAVED_ORDER,

      totalTime: 0,
      completed: false,
      dateCreated: {},
    };
    return this.pipelineDBService.createOne(instance);
  };

  private createBatchedScenario = async (
    scenarioName: string
  ): Promise<string> => {
    /*
      Player 1 tokens light up in order A, 1, B, 2, C, 3 etc.
      Player 1 can initially only put tokens up to specified batch number (e.g. 8)

      Player 2 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 2 recieves tokens in batches from player 1 (e.g. 8)

      Player 3 has to put tokens in order A, 1, B, 2, C, 3 etc
      Player 3 recieves tokens in batches from player 2 (e.g. 8)

    */

    const instance: PipelineScenarioInstance = {
      name: scenarioName,
      type: PipelineScenarioTypeEnum.RANDOM,
      state: PipelineScenarioStateEnum.CONFIGURING,

      batched: true,
      batchSize: 8,
      released: false,
      releaseSize: 0,

      owner_id: '',

      player1_id: '',
      player1_tokens: shuffle(FULL_SET),
      player1_next: WEAVED_ORDER,

      player2_id: '',
      player2_tokens: [],
      player2_next: WEAVED_ORDER,

      player3_id: '',
      player3_tokens: [],
      player3_next: WEAVED_ORDER,

      totalTime: 0,
      completed: false,
      dateCreated: {},
    };

    return this.pipelineDBService.createOne(instance);
  };

  private createBatchReleasedScenario = async (
    scenarioName: string
  ): Promise<string> => {
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

    const instance: PipelineScenarioInstance = {
      name: scenarioName,
      type: PipelineScenarioTypeEnum.RANDOM,
      state: PipelineScenarioStateEnum.CONFIGURING,

      batched: true,
      batchSize: 8,
      released: true,
      releaseSize: 2,

      owner_id: '',

      player1_id: '',
      player1_tokens: shuffle(FULL_SET),
      player1_next: WEAVED_ORDER,

      player2_id: '',
      player2_tokens: [],
      player2_next: WEAVED_ORDER,

      player3_id: '',
      player3_tokens: [],
      player3_next: WEAVED_ORDER,

      totalTime: 0,
      completed: false,
      dateCreated: {},
    };
    return this.pipelineDBService.createOne(instance);
  };

  private createPrioritisedScenario = async (
    scenarioName: string
  ): Promise<string> => {
    /*
      Players have to put tokens in the order:
      A,B,C,D...J,1,2,3,4....10,K,L,M,N....T,11,12,13,14....20

      Follows batch released scenario rules otherwise.
    */

    const instance: PipelineScenarioInstance = {
      name: scenarioName,
      type: PipelineScenarioTypeEnum.RANDOM,
      state: PipelineScenarioStateEnum.CONFIGURING,

      batched: true,
      batchSize: 8,
      released: true,
      releaseSize: 2,

      owner_id: '',

      player1_id: '',
      player1_tokens: shuffle(FULL_SET),
      player1_next: PRIORITISED_ORDER,

      player2_id: '',
      player2_tokens: [],
      player2_next: PRIORITISED_ORDER,

      player3_id: '',
      player3_tokens: [],
      player3_next: PRIORITISED_ORDER,

      totalTime: 0,
      completed: false,
    };

    return this.pipelineDBService.createOne(instance);
  };
}
