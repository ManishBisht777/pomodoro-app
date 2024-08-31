"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PauseIcon, Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

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

const FOCUS = 25 * 60;
const BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

export default function Pomodoro({}: PomodoroProps) {
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>({
    timer: FOCUS,
    isRunning: false,
    iteration: 1,
    action: PomodoroAction.FOCUS,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const changePomodoroState = (
    action: PomodoroAction,
    prevState: PomodoroState
  ) => {
    switch (action) {
      case PomodoroAction.LONG_BREAK:
        return {
          ...prevState,
          timer: LONG_BREAK,
          action: PomodoroAction.LONG_BREAK,
          iteration: prevState.iteration + 1,
        };
      case PomodoroAction.BREAK:
        return {
          ...prevState,
          timer: BREAK,
          action: PomodoroAction.BREAK,
        };
      case PomodoroAction.FOCUS:
        return {
          ...prevState,
          action: PomodoroAction.FOCUS,
          timer: FOCUS,
          iteration: prevState.iteration + 1,
        };
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setPomodoroState((prevState) => ({
        ...prevState,
        isRunning: false,
      }));
    }
  };

  const startTimer = () => {
    if (timerRef.current) {
      stopTimer();
      return;
    }

    timerRef.current = setInterval(() => {
      setPomodoroState((prevState) => {
        if (
          prevState.timer === 0 &&
          prevState.action === PomodoroAction.FOCUS
        ) {
          if (prevState.iteration % 4 === 0) {
            return changePomodoroState(PomodoroAction.LONG_BREAK, prevState);
          } else {
            return changePomodoroState(PomodoroAction.BREAK, prevState);
          }
        } else if (
          prevState.timer === 0 &&
          prevState.action !== PomodoroAction.FOCUS
        ) {
          return changePomodoroState(PomodoroAction.FOCUS, prevState);
        } else {
          return {
            ...prevState,
            isRunning: true,
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
          return changePomodoroState(PomodoroAction.LONG_BREAK, prevState);
        } else {
          return changePomodoroState(PomodoroAction.BREAK, prevState);
        }
      } else {
        return changePomodoroState(PomodoroAction.FOCUS, prevState);
      }
    });
  };

  const formatTIme = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const getTextByAction = (action: PomodoroAction) => {
    switch (action) {
      case PomodoroAction.FOCUS:
        return "Focus";
      case PomodoroAction.BREAK:
        return "Break";
      case PomodoroAction.LONG_BREAK:
        return "Long Break";
    }
  };

  const getColorByAction = (action: PomodoroAction) => {
    switch (action) {
      case PomodoroAction.FOCUS:
        return "bg-red-500";
      case PomodoroAction.BREAK:
        return "bg-green-500";
      case PomodoroAction.LONG_BREAK:
        return "bg-blue-500";
    }
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [pomodoroState.action]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center relative h-screen p-20">
      <div className="flex items-center flex-col">
        <p>{getTextByAction(pomodoroState.action)}</p>
        <h2 className="text-9xl font-extrabold">
          {formatTIme(pomodoroState.timer)}
        </h2>
      </div>
      <div>
        <Button
          className={cn(
            "w-12 h-12 rounded-xl",
            getColorByAction(pomodoroState.action)
          )}
          size="icon"
          onClick={startTimer}
        >
          {pomodoroState.isRunning ? (
            <PauseIcon size={20} />
          ) : (
            <Play size={20} />
          )}
        </Button>
      </div>
      <p className="absolute top-10 right-10">#{pomodoroState.iteration}</p>
    </div>
  );
}
