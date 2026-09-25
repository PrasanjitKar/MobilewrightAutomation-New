export type ScenarioStatus = 'PASSED' | 'FAILED' | 'SKIPPED';

export interface Result {
  module: string;
  name: string;
  status: ScenarioStatus;
  duration: number;
  error: string;
  startTime: string;
  endTime: string;
}
