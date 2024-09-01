import { PomodoroAction } from "../enums/timer";

export type PomodoroState = {
  timer: number;
  isRunning: boolean;
  action: PomodoroAction;
  iteration: number;
};
