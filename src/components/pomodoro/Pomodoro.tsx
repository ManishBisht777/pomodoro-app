"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";

interface PomodoroProps {}

enum PomodoroAction {
  FOCUS = "FOCUS",
  BREAK = "BREAK",
  LONG_BREAK = "LONG_BREAK",
}

type PomodoroState = {
  timer: number;
  isRunning: boolean;
  action: PomodoroAction;
  iteration: number;
};

const FOCUS = 3;
const BREAK = 1;
const LONG_BREAK = 2;

export default function Pomodoro({}: PomodoroProps) {
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    timer: FOCUS,
    isRunning: false,
    iteration: 1,
    action: PomodoroAction.FOCUS,
  });

  const changePomodoroState = (action: PomodoroAction) => {
    switch (action) {
      case PomodoroAction.LONG_BREAK:
        return {
          ...pomodoroState,
          timer: LONG_BREAK,
          action: PomodoroAction.LONG_BREAK,
          iteration: pomodoroState.iteration + 1,
        };
      case PomodoroAction.BREAK:
        return {
          ...pomodoroState,
          timer: BREAK,
          action: PomodoroAction.BREAK,
          iteration: pomodoroState.iteration + 1,
        };
      case PomodoroAction.FOCUS:
        return {
          ...pomodoroState,
          iteration: pomodoroState.iteration + 1,
          action: PomodoroAction.FOCUS,
          timer: FOCUS,
        };
    }
  };

  const startTimer = () => {
    setInterval(() => {
      setPomodoroState((prevState) => {
        if (
          prevState.timer === 0 &&
          prevState.action === PomodoroAction.FOCUS
        ) {
          if (prevState.iteration % 8 === 0) {
            return changePomodoroState(PomodoroAction.LONG_BREAK);
          } else {
            return changePomodoroState(PomodoroAction.BREAK);
          }
        } else if (
          prevState.timer === 0 &&
          prevState.action !== PomodoroAction.FOCUS
        ) {
          return changePomodoroState(PomodoroAction.FOCUS);
        } else {
          return {
            ...prevState,
            timer: prevState.timer - 1,
          };
        }
      });
    }, 1000);
  };

  const skipTimer = () => {
    setPomodoroState((prevState) => {
      if (prevState.action === PomodoroAction.FOCUS) {
        if (prevState.iteration % 8 === 0) {
          return changePomodoroState(PomodoroAction.LONG_BREAK);
        } else {
          return changePomodoroState(PomodoroAction.BREAK);
        }
      } else {
        return changePomodoroState(PomodoroAction.FOCUS);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <p>{pomodoroState.action}</p>
      <p>{pomodoroState.timer}</p>
      <div>
        <Button onClick={startTimer}>Start</Button>
        <Button onClick={skipTimer}>Skip</Button>
      </div>
      <p>Iterations #{pomodoroState.iteration}</p>
      <p>Cycles #{Math.floor((pomodoroState.iteration - 1) / 8)}</p>
    </div>
  );
}
