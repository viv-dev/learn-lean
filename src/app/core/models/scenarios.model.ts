export enum PipelineScenarioTypeEnum {
  RANDOM,
  ORDERED,
  BATCHED,
  BATCH_RELEASED,
  PRIORITISED,
}

export enum PlayerTypeEnum {
  PLAYER_ONE,
  PLAYER_TWO,
  PLAYER_THREE,
}

export const scenarioMap = new Map<PipelineScenarioTypeEnum, string>([
  [PipelineScenarioTypeEnum.RANDOM, '1 - Random'],
  [PipelineScenarioTypeEnum.ORDERED, '2 - Ordered'],
  [PipelineScenarioTypeEnum.BATCHED, '3 - Batched Ordered'],
  [PipelineScenarioTypeEnum.BATCH_RELEASED, '4 - Limited Batched'],
  [PipelineScenarioTypeEnum.PRIORITISED, '5 - Batched Weaved Ordered'],
]);

export const pipelineScenarioTypeLookup = (
  type: PipelineScenarioTypeEnum | number
): string => {
  if (scenarioMap.has(type)) {
    return scenarioMap.get(type)!;
  }
  return 'Uknown';
};

export enum PipelineScenarioStateEnum {
  CONFIGURING = 0,
  IN_PROGRESS = 1,
  FINISHED = 2,
  CLOSED = 3,
}

export const stateMap = new Map<PipelineScenarioStateEnum, string>([
  [PipelineScenarioStateEnum.CONFIGURING, 'Setup'],
  [PipelineScenarioStateEnum.IN_PROGRESS, 'In Progress'],
  [PipelineScenarioStateEnum.FINISHED, 'Finished'],
]);

export const pipelineScenarioStateLookup = (
  type: PipelineScenarioTypeEnum | number
): string => {
  if (stateMap.has(type)) {
    return stateMap.get(type)!;
  }
  return 'Uknown';
};

export interface ScenarioPlayer {
  username: string;
}

export interface PipeLineScenario {
  name: string;
  type: PipelineScenarioTypeEnum;
}

export interface PipelineScenarioInstance {
  id: string;
  name: string;
  type: PipelineScenarioTypeEnum;
  state: PipelineScenarioStateEnum;

  owner_id: string;

  player1_id: string;
  player2_id: string;
  player3_id: string;

  player1_tokens: string[];
  player1_next: string[];

  player2_tokens: string[];
  player2_next: string[];
  player2_batched: boolean;
  player2_batch_size: number | null;

  player3_tokens: string[];
  player3_next: string[];
  player3_batched: boolean;
  player3_batch_size: number | null;

  totalTime: number;
  completed: boolean;
  created: any;
}
