export enum PipelineScenarioTypeEnum {
  RANDOM,
  ORDERED,
  BATCHED_ORDERED,
  LIMITED_ORDERED,
  WEAVED_ORDERED,
}

export const scenarioMap = new Map<PipelineScenarioTypeEnum, string>([
  [PipelineScenarioTypeEnum.RANDOM, '1 - Random'],
  [PipelineScenarioTypeEnum.ORDERED, '2 - Ordered'],
  [PipelineScenarioTypeEnum.BATCHED_ORDERED, '3 - Batched Ordered'],
  [PipelineScenarioTypeEnum.LIMITED_ORDERED, '4 - Limited Batched'],
  [PipelineScenarioTypeEnum.WEAVED_ORDERED, '5 - Batched Weaved Ordered'],
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
  [PipelineScenarioStateEnum.CLOSED, 'Closed'],
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
  player1_id: string;
  player2_id: string;
  player3_id: string;
  totalTime: number;
  completed: boolean;
  created: any;
}
